import { ModalProps } from 'antd';
import { FunctionComponent, useCallback, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { Path } from '../config/routes';
import {
  NoNullTransferNetwork,
  SS58Prefix,
  TransferFormValues,
  Tx,
  TxHashType,
  TxSuccessComponentProps,
} from '../model';
import { TxContext, TxCtx } from '../providers';
import { applyModal, convertToSS58, genHistoryRouteParams, getNetworkMode, isEthereumNetwork } from '../utils';
import { useApi } from './api';

export const useTx = () => useContext(TxContext) as Exclude<TxCtx, null>;

export function useAfterSuccess<
  T extends TransferFormValues<{ sender: string; recipient?: string }, NoNullTransferNetwork>
>() {
  const { t } = useTranslation();
  const history = useHistory();
  const { chain } = useApi();

  const afterTx = useCallback(
    (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Comp: FunctionComponent<TxSuccessComponentProps<TransferFormValues<any, NoNullTransferNetwork>>>,
        {
          onDisappear,
          hashType = 'txHash',
        }: Exclude<ModalProps, 'onCancel'> & {
          onDisappear: (value: T, tx: Tx) => void;
          hashType?: TxHashType;
        }
      ) =>
      (value: T) =>
      (tx: Tx) =>
      () => {
        const { destroy } = applyModal({
          content: <Comp tx={tx} value={value} hashType={hashType} />,
          okText: t('Cross-chain history'),
          okButtonProps: {
            size: 'large',
            onClick: () => {
              destroy();

              const { from, to } = value.transfer;
              const fMode = getNetworkMode(from);
              const sender =
                isEthereumNetwork(value.transfer.from.name) || fMode === 'dvm'
                  ? value.sender
                  : convertToSS58(value.sender, chain.ss58Format as unknown as SS58Prefix);

              history.push(
                Path.history +
                  '?' +
                  genHistoryRouteParams({
                    from: from.name,
                    fMode,
                    sender,
                    to: to.name,
                    tMode: getNetworkMode(to),
                  })
              );
            },
          },
          onCancel: (close) => {
            onDisappear(value, tx);
            close();
          },
        });
      },
    [chain.ss58Format, history, t]
  );

  return { afterTx };
}
