import { Button, Descriptions, Form } from 'antd';
import BN from 'bn.js';
import { isNull } from 'lodash';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { from, Observable, of, Subscription, switchMap } from 'rxjs';
import { Balance } from '../../components/form-control/Balance';
import { EthereumAccountItem } from '../../components/form-control/EthereumAccountItem';
import { MappingTokenControl } from '../../components/form-control/MappingTokenControl';
import { MaxBalance } from '../../components/form-control/MaxBalance';
import { RecipientItem } from '../../components/form-control/RecipientItem';
import { ApproveConfirm } from '../../components/modal/ApproveConfirm';
import { ApproveSuccess } from '../../components/modal/ApproveSuccess';
import { Des } from '../../components/modal/Des';
import { TransferConfirm } from '../../components/modal/TransferConfirm';
import { TransferSuccess } from '../../components/modal/TransferSuccess';
import { FormItemExtra } from '../../components/widget/facade';
import { FORM_CONTROL, LONG_DURATION, Path, RegisterStatus } from '../../config';
import {
  MemoedTokenInfo,
  useAfterTx,
  useApi,
  useIsMounted,
  useIsMountedOperator,
  useMappingTokens,
  useTx,
} from '../../hooks';
import {
  ChainConfig,
  CommonPayloadKeys,
  CrossChainAsset,
  CrossChainComponentProps,
  CrossChainDirection,
  CrossChainParty,
  CrossChainPayload,
  DailyLimit,
  DeepRequired,
  DVMChainConfig,
  MappingToken,
  Network,
  RequiredPartial,
  Token,
  Tx,
} from '../../model';
import {
  applyModalObs,
  approveToken,
  createTxWorkflow,
  fromWei,
  getAllowance,
  getNetworkMode,
  getUnit,
  insufficientBalanceRule,
  insufficientDailyLimit,
  isPolkadotNetwork,
  isValidAddress,
  pollWhile,
  prettyNumber,
  toWei,
} from '../../utils';

interface DVMPayload extends CrossChainParty, CrossChainAsset<MappingToken> {}

type DVMTxPayload = CrossChainPayload<DeepRequired<DVMPayload, [CommonPayloadKeys]>>;

type ApproveValue = CrossChainPayload<RequiredPartial<DVMPayload, 'sender'>>;

interface DVMProps {
  tokenRegisterStatus: RegisterStatus;
  canRegister: boolean;
  approveOptions?: Record<string, string>;
  isDVM?: boolean;
  transform: (value: DVMTxPayload) => Observable<Tx>;
  spenderResolver: (direction: CrossChainDirection) => Promise<string>;
  getDailyLimit?: (token: MappingToken) => Promise<DailyLimit>;
  getFee?: (departure: ChainConfig, token: MappingToken) => Promise<string>;
}

interface TransferInfoProps {
  amount: string;
  tokenInfo: MemoedTokenInfo | null;
  direction: CrossChainDirection<DVMChainConfig, ChainConfig>;
  dailyLimit: DailyLimit | null;
  fee: string | null;
}

/* ----------------------------------------------Base info helpers-------------------------------------------------- */

// eslint-disable-next-line complexity
function TransferInfo({ tokenInfo, amount, direction, dailyLimit, fee }: TransferInfoProps) {
  const [symbol, setSymbol] = useState('');
  const unit = tokenInfo ? getUnit(+tokenInfo.decimals) : 'ether';
  const value = new BN(toWei({ value: amount || '0', unit }));

  const isNoLimit = useMemo(() => {
    if (dailyLimit) {
      return new BN(dailyLimit.limit).isZero();
    }

    return false;
  }, [dailyLimit]);

  useEffect(() => {
    const { to: arrival } = direction;
    const mode = getNetworkMode(arrival);

    (async () => {
      if (tokenInfo && isPolkadotNetwork(arrival.name) && mode === 'native') {
        const result = tokenInfo.symbol.replace('x', '');

        setSymbol(result);
      }
    })();
  }, [tokenInfo, direction]);

  return (
    <Descriptions size="small" column={1} labelStyle={{ color: 'inherit' }} className="text-green-400">
      {!value.isZero() && (
        <Descriptions.Item label={<Trans>Recipient will receive</Trans>} contentStyle={{ color: 'inherit' }}>
          {fromWei({ value, unit })} {symbol}
        </Descriptions.Item>
      )}

      {!!fee && (
        <Descriptions.Item label={<Trans>Cross-chain Fee</Trans>} contentStyle={{ color: 'inherit' }}>
          <span className="flex items-center">
            {fee} {direction.from.ethereumChain.nativeCurrency.symbol}
          </span>
        </Descriptions.Item>
      )}

      {!!dailyLimit && (
        <Descriptions.Item label={<Trans>Daily Limit</Trans>} contentStyle={{ color: 'inherit' }}>
          {isNoLimit ? (
            <Trans>No Limit</Trans>
          ) : (
            fromWei({ value: new BN(dailyLimit.limit).sub(new BN(dailyLimit.spentToday)), unit: 'gwei' }, prettyNumber)
          )}
        </Descriptions.Item>
      )}
    </Descriptions>
  );
}

/* ----------------------------------------------Main Section-------------------------------------------------- */

// eslint-disable-next-line complexity
export function DVM({
  form,
  setSubmit,
  transform,
  spenderResolver,
  tokenRegisterStatus,
  canRegister,
  getDailyLimit,
  getFee,
  direction,
  isDVM = true,
}: CrossChainComponentProps<DVMPayload> & DVMProps) {
  const { t } = useTranslation();

  const {
    mainConnection: { accounts },
    assistantConnection,
  } = useApi();

  const { total, tokens, refreshTokenBalance } = useMappingTokens(
    form.getFieldValue(FORM_CONTROL.direction),
    tokenRegisterStatus
  );

  const [allowance, setAllowance] = useState(new BN(0));
  const [dailyLimit, setDailyLimit] = useState<DailyLimit | null>(null);
  const [selectedToken, setSelectedToken] = useState<MappingToken | null>(null);

  const tokenInfo = useMemo<Token>(
    () => ({
      symbol: selectedToken?.symbol ?? '',
      decimal: getUnit(+(selectedToken?.decimals ?? '9')),
    }),
    [selectedToken]
  );

  const availableBalance = useMemo(() => {
    return !selectedToken
      ? null
      : fromWei({ value: selectedToken.balance, unit: getUnit(+selectedToken.decimals) }, prettyNumber);
  }, [selectedToken]);

  const account = useMemo(() => {
    const acc = (accounts || [])[0];

    return isValidAddress(acc?.address, 'ethereum') ? acc.address : '';
  }, [accounts]);

  const recipients = useMemo(
    () =>
      isPolkadotNetwork(direction.to.name) && assistantConnection.accounts?.length
        ? assistantConnection.accounts
        : undefined,
    [assistantConnection.accounts, direction.to]
  );

  const [curAmount, setCurAmount] = useState<string>(() => form.getFieldValue(FORM_CONTROL.amount) ?? '');
  const unit = useMemo(() => (selectedToken ? getUnit(+selectedToken.decimals) : 'ether'), [selectedToken]);
  const { observer } = useTx();
  const { afterCrossChain, afterApprove } = useAfterTx();
  const [fee, setFee] = useState<string>('');
  const isMounted = useIsMounted();
  const { takeWhileIsMounted } = useIsMountedOperator();

  const refreshAllowance = useCallback(
    (dir: CrossChainDirection) => {
      if (isMounted) {
        from(spenderResolver(dir))
          .pipe(
            switchMap((spender) => getAllowance(account, spender, selectedToken)),
            takeWhileIsMounted()
          )
          .subscribe((num) => {
            setAllowance(num);
            form.validateFields([FORM_CONTROL.amount]);
          });
      }
    },
    [account, form, isMounted, selectedToken, spenderResolver, takeWhileIsMounted]
  );

  useEffect(() => {
    let sub$$: Subscription | null = null;

    if (getFee) {
      const { from: departure } = direction;

      sub$$ = from(getFee(departure, selectedToken!)).subscribe(setFee);
    }

    return () => sub$$?.unsubscribe();
  }, [direction, getFee, selectedToken]);

  useEffect(() => {
    const fn = () => (data: DVMTxPayload) => {
      const { amount } = data;
      const value = { ...data, amount: toWei({ value: data.amount, unit }) };

      const beforeTx = applyModalObs({
        content: (
          <TransferConfirm value={value}>
            <Des
              title={<Trans>Amount</Trans>}
              content={
                <span>
                  {amount} {value.asset.symbol}
                </span>
              }
            ></Des>
          </TransferConfirm>
        ),
      });

      const txObs = transform(value);

      return createTxWorkflow(
        beforeTx,
        txObs,
        afterCrossChain(TransferSuccess, {
          onDisappear: () => {
            refreshTokenBalance(value.asset.address);
            refreshAllowance(value.direction);
          },
          unit,
        })(value)
      ).subscribe(observer);
    };

    setSubmit(fn);
  }, [afterCrossChain, observer, refreshAllowance, refreshTokenBalance, selectedToken, setSubmit, transform, unit]);

  useEffect(() => {
    let sub$$: Subscription | null = null;

    if (getDailyLimit && selectedToken?.address) {
      sub$$ = of(null)
        .pipe(
          switchMap(() => from(getDailyLimit(selectedToken))),
          pollWhile(LONG_DURATION, () => isMounted)
        )
        .subscribe(setDailyLimit);
    }

    return () => sub$$?.unsubscribe();
  }, [getDailyLimit, isMounted, selectedToken]);

  return (
    <>
      <EthereumAccountItem form={form} />

      <RecipientItem
        form={form}
        direction={direction}
        accounts={recipients}
        extraTip={t(
          'After the transaction is confirmed, the account cannot be changed. Please do not fill in the exchange account.'
        )}
        isDvm={isDVM}
      />

      <Form.Item
        name={FORM_CONTROL.asset}
        label={t('Asset')}
        extra={
          canRegister ? (
            <FormItemExtra className="inline-block mt-2">
              <Trans i18nKey="registrationTip">
                If you can not find the token you want to send in the list, highly recommended to
                <Link to={Path.register}> go to the registration page</Link>, where you will find it after completing
                the registration steps.
              </Trans>
            </FormItemExtra>
          ) : null
        }
        rules={[{ required: true }]}
        className="mb-2"
      >
        <MappingTokenControl
          tokens={tokens}
          total={total}
          onChange={async (erc20) => {
            setSelectedToken(erc20);

            const spender = await spenderResolver(direction);
            const allow = await getAllowance(account, spender, erc20);

            setAllowance(allow);

            if (getDailyLimit && erc20?.address) {
              getDailyLimit(erc20).then(setDailyLimit);
            }
          }}
        />
      </Form.Item>

      <Form.Item
        name={FORM_CONTROL.amount}
        validateFirst
        label={t('Amount')}
        rules={[
          { required: true },
          insufficientBalanceRule({
            t,
            compared: selectedToken?.balance,
            token: tokenInfo,
          }),
          insufficientDailyLimit({
            t,
            compared:
              dailyLimit && !new BN(dailyLimit.limit).isZero()
                ? new BN(dailyLimit.limit).sub(new BN(dailyLimit.spentToday)).toString()
                : toWei({ value: 1 }),
            token: tokenInfo,
          }),
          {
            validator: (_, value: string) => {
              const val = new BN(toWei({ value }));

              return allowance.gte(val) ? Promise.resolve() : Promise.reject();
            },
            message: (
              <Trans i18nKey="approveBalanceInsufficient">
                Exceed the authorized amount, click to authorize more amount, or reduce the transfer amount
                <Button
                  onClick={async () => {
                    const value: Pick<ApproveValue, 'direction' | 'sender' | 'asset'> = {
                      sender: account,
                      direction,
                      asset: selectedToken,
                    };
                    const spender = await spenderResolver(direction);
                    const beforeTx = applyModalObs({
                      content: <ApproveConfirm value={value} />,
                    });
                    const txObs = approveToken({
                      sender: account,
                      direction,
                      tokenAddress: selectedToken?.address,
                      spender,
                    });

                    createTxWorkflow(
                      beforeTx,
                      txObs,
                      afterApprove(ApproveSuccess, { onDisappear: () => refreshAllowance(value.direction) })(value)
                    ).subscribe(observer);
                  }}
                  type="link"
                  size="small"
                >
                  approve
                </Button>
              </Trans>
            ),
          },
        ]}
      >
        <Balance
          size="large"
          placeholder={t('Available Balance {{balance}}', {
            balance: isNull(availableBalance) ? t('Querying') : availableBalance,
          })}
          onChange={setCurAmount}
          className="flex-1"
        >
          <MaxBalance
            network={form.getFieldValue(FORM_CONTROL.direction).from?.name as Network}
            onClick={() => {
              const amount = fromWei({ value: selectedToken?.balance, unit }, prettyNumber);

              form.setFieldsValue({ [FORM_CONTROL.amount]: amount });
              setCurAmount(amount);
            }}
            size="large"
          />
        </Balance>
      </Form.Item>

      <TransferInfo
        amount={curAmount}
        tokenInfo={selectedToken}
        direction={form.getFieldValue(FORM_CONTROL.direction)}
        fee={fee}
        dailyLimit={dailyLimit}
      />
    </>
  );
}