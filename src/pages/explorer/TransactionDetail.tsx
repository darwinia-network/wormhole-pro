import { ClockCircleFilled, ClockCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Breadcrumb, Divider, Progress, Tooltip } from 'antd';
import ErrorBoundary from 'antd/lib/alert/ErrorBoundary';
import BreadcrumbItem from 'antd/lib/breadcrumb/BreadcrumbItem';
import camelcaseKeys from 'camelcase-keys';
import { formatDistance, formatDistanceToNow, formatRFC7231 } from 'date-fns';
import { GraphQLClient, useManualQuery } from 'graphql-hooks';
import { has } from 'lodash';
import { PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams, withRouter } from 'react-router-dom';
import { from as rxFrom } from 'rxjs';
import { S2S_ISSUING_RECORD_QUERY, S2S_REDEEM_RECORD_QUERY } from '../../bridges/substrate-substrateDVM/config';
import { Substrate2SubstrateDVMRecord, SubstrateDVM2SubstrateRecord } from '../../bridges/substrate-substrateDVM/model';
import { CrossChainState } from '../../components/widget/CrossChainStatus';
import { EllipsisMiddle } from '../../components/widget/EllipsisMiddle';
import { CrossChainStatus } from '../../config/constant';
import { Arrival, Departure, Substrate2SubstrateRecord } from '../../model';
import { fromWei, getBridge, prettyNumber } from '../../utils';
import { Party } from './Party';

const s2sDVMFields: [keyof Substrate2SubstrateDVMRecord, keyof Substrate2SubstrateRecord][] = [
  ['senderId', 'sender'],
  ['startTimestamp', 'startTime'],
  ['endTimestamp', 'endTime'],
];
const sDVM2sFields: [keyof SubstrateDVM2SubstrateRecord, keyof Substrate2SubstrateRecord][] = [
  ['end_timestamp', 'endTime'],
  ['start_timestamp', 'startTime'],
];

const unifyRecordField: (record: Record<string, unknown>, fieldsMap: [string, string][]) => Record<string, unknown> = (
  data,
  fieldsMap
) => {
  const renamed = fieldsMap.reduce((acc, cur) => {
    const [oKey, nKey] = cur;

    if (has(acc, oKey)) {
      acc[nKey] = acc[oKey];
    }

    delete acc[oKey];

    return acc;
  }, data);
  const record = camelcaseKeys(renamed);

  return record;
};

export function Description({ tip, title, children }: PropsWithChildren<{ tip: string; title: string }>) {
  return (
    <div className="flex flex-wrap md:items-center gap-2 md:gap-16 my-3 md:my-6">
      <div className="w-36 flex items-center gap-2">
        <Tooltip title={tip} className="cursor-help">
          <InfoCircleOutlined />
        </Tooltip>
        <span className="capitalize">{title}</span>
      </div>

      {children}
    </div>
  );
}

export function useRecordQuery<T>(id: string, direction: [Departure, Arrival]) {
  const bridge = getBridge(direction);
  const isIssuing = bridge.isIssuing(...direction);
  const apiKey = isIssuing ? 'subql' : 'subGraph';
  // TODO: handle query
  const query = isIssuing ? S2S_ISSUING_RECORD_QUERY : S2S_REDEEM_RECORD_QUERY;
  const reg = /\S\w+\(/g;
  const resultKey = query.match(reg)?.reverse()[0].slice(0, -1) as string;
  const url = (bridge.config.api || {})[apiKey];
  const [fetchRecord, state] = useManualQuery<T>(query, {
    client: new GraphQLClient({ url: url.endsWith('-') ? url + bridge.departure.name : url }),
    variables: { id },
  });

  return { fetchRecord, state, resultKey };
}

// eslint-disable-next-line complexity
function Page() {
  const { t } = useTranslation();
  const param = useParams<{ id: string }>();
  const { state, search } = useLocation<Substrate2SubstrateRecord | null>();

  const direction = useMemo(() => {
    const searchParams = new URLSearchParams(search);
    const departure = {};
    const arrival = {};

    searchParams.forEach((value, key) => {
      if (key.startsWith('from')) {
        Object.assign(departure, { [/from$/.test(key) ? 'network' : 'mode']: value });
      }
      if (key.startsWith('to')) {
        Object.assign(arrival, { [/to$/.test(key) ? 'network' : 'mode']: value });
      }
    });

    return [departure, arrival] as [Departure, Arrival];
  }, [search]);

  const bridge = getBridge(direction);
  const { id } = param;
  const { fetchRecord, resultKey } = useRecordQuery(id, direction);
  const [record, setRecord] = useState<Substrate2SubstrateRecord | null>(state);
  const amount = useMemo(() => fromWei({ value: record?.amount ?? 0, unit: 'gwei' }, prettyNumber), [record?.amount]);

  useEffect(() => {
    if (record) {
      return;
    }

    const sub$$ = rxFrom(fetchRecord()).subscribe((res) => {
      const result = unifyRecordField((res.data as Record<string, unknown>)[resultKey] as Record<string, unknown>, [
        ...s2sDVMFields,
        ...sDVM2sFields,
      ]);
      const [dep, arr] = direction;
      const data = {
        ...result,
        id,
        bridge: 'helix',
        fromChain: dep.network,
        fromChainMode: dep.mode,
        toChain: arr.network,
        toChainMode: arr.mode,
      } as Substrate2SubstrateRecord;

      setRecord(data);
    });

    return () => sub$$?.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ErrorBoundary>
      <Breadcrumb className="whitespace-nowrap flex items-center overflow-hidden overflow-ellipsis">
        <BreadcrumbItem>{t('Explorer')}</BreadcrumbItem>
        <BreadcrumbItem>{t('Transaction')}</BreadcrumbItem>
        <BreadcrumbItem>
          <EllipsisMiddle className="w-32 md:w-72 lg:w-96">{record?.requestTxHash}</EllipsisMiddle>
        </BreadcrumbItem>
      </Breadcrumb>

      <div className="flex justify-between items-center mt-6">
        <h3 className="uppercase text-xs md:text-lg">{t('transaction detail')}</h3>

        <div>
          <div className="flex items-center gap-4 p-3 bg-antDark" style={{ borderRadius: 40 }}>
            <img src={bridge.departure.facade.logo} className="w-5 md:w-10" />
            <div
              className="self-stretch flex items-center px-4 md:px-8"
              style={{
                clipPath: 'polygon(85% 0%, 100% 50%, 85% 100%, 0% 100%, 15% 50%, 0% 0%)',
                backgroundColor: '#012342',
              }}
            >
              <img src={`/image/bridges/${bridge.category}.png`} className="w-10 md:w-20" />
            </div>
            <img src={bridge.arrival.facade.logo} className="w-5 md:w-10" />
          </div>

          <div className="flex justify-between text-xs capitalize mt-1">
            <div style={{ width: 40 }}>{bridge.departure.name}</div>
            <div style={{ width: 40 }}>{bridge.arrival.name}</div>
          </div>
        </div>
      </div>

      <div className="px-8 py-3 mt-6 bg-antDark">
        <Description title={t('Source Tx Hash')} tip={t('Address (external or contract) receiving the transaction.')}>
          {record && <EllipsisMiddle>{record.requestTxHash}</EllipsisMiddle>}
        </Description>

        <Description
          title={t('Target Tx Hash')}
          tip={t('Unique character string (TxID) assigned to every verified transaction on the Target Chain.')}
        >
          {record?.responseTxHash ? (
            <EllipsisMiddle>{record.responseTxHash}</EllipsisMiddle>
          ) : (
            <Progress
              // eslint-disable-next-line no-magic-numbers
              percent={record?.result === CrossChainStatus.reverted ? 100 : 90}
              status={record?.result === CrossChainStatus.reverted ? 'exception' : 'normal'}
            />
          )}
        </Description>

        <Description
          title={t('Status')}
          tip={t('The status of the cross-chain transaction: Success, Pending, or Reverted.')}
        >
          {<CrossChainState value={record?.result ?? 0} />}
        </Description>

        <Description
          title={t('Timestamp')}
          tip={t('Date & time of cross-chain transaction inclusion, including length of time for confirmation.')}
        >
          {record?.startTime && (
            <div className="flex items-center gap-2">
              <ClockCircleOutlined />
              <span>{formatDistanceToNow(new Date(record.startTime), { includeSeconds: true, addSuffix: true })}</span>
              <span className="hidden md:inline-block">({formatRFC7231(new Date(record.startTime))})</span>
              <Divider type="vertical" orientation="center" />

              <ClockCircleFilled className="text-gray-400" />

              <span className="text-gray-400">
                {t('Confirmed within {{des}}', {
                  des: formatDistance(new Date(record.endTime), new Date(record.startTime), { includeSeconds: true }),
                })}
              </span>
            </div>
          )}
        </Description>

        <Divider />

        <Description title={t('Sender')} tip={t('Address (external or contract) sending the transaction.')}>
          {record && (
            <Party
              chain={record.fromChain}
              account={record.sender}
              mode={record.fromChainMode}
              showName={false}
              copyable
            />
          )}
        </Description>

        <Description title={t('Receiver')} tip={t('Address (external or contract) receiving the transaction.')}>
          {record && (
            <Party
              chain={record.toChain}
              account={record.recipient}
              mode={record.toChainMode}
              showName={false}
              copyable
            />
          )}
        </Description>

        {record?.result && (
          <Description
            title={t('Token Transfer')}
            tip={t('List of tokens transferred in this cross-chain transaction.')}
          >
            <div className="flex flex-col gap-2">
              {[
                {
                  logo: bridge.departure.facade.logo,
                  from: record.sender,
                  to: '0x1234567891234569999',
                  token: { logo: '/image/ring.svg', name: 'RING' },
                },
                {
                  logo: bridge.arrival.facade.logoAssist,
                  from: '0x1234567891234569999',
                  to: record.recipient,
                  token: { logo: '/image/ring.svg', name: 'xRING' },
                },
              ].map(({ logo, from, to, token }) => (
                <div key={token.name} className="flex items-center gap-2">
                  <img src={logo} className="w-5" />
                  <span>{t('From')}</span>
                  <span className="w-32 text-center">
                    <EllipsisMiddle>{from}</EllipsisMiddle>
                  </span>
                  <span>{t('To')}</span>
                  <span className="w-32 text-center">
                    <EllipsisMiddle>{to}</EllipsisMiddle>
                  </span>
                  <span>{t('For')}</span>
                  <img src={token.logo} className="w-5" />
                  <span>
                    {amount} {token.name}
                  </span>
                </div>
              ))}
            </div>
          </Description>
        )}

        <Divider />

        <Description
          title={t('Value')}
          tip={t('The amount to be transferred to the recipient with the cross-chain transaction.')}
        >
          {amount}
        </Description>

        <Description title={t('Transaction Fee')} tip={'Amount paid for processing the cross-chain transaction.'}>
          NaN
        </Description>

        <Divider />

        <Description title={t('Nonce')} tip={t('A unique number of cross-chain transaction in Bridge')}>
          {record?.nonce}
        </Description>
      </div>
    </ErrorBoundary>
  );
}

export const TransactionsDetail = withRouter(Page);
