import { ClockCircleOutlined, ImportOutlined, RightOutlined } from '@ant-design/icons';
import { Collapse, Progress, Tooltip } from 'antd';
import { format } from 'date-fns';
import { fromUnixTime } from 'date-fns/esm';
import { PropsWithChildren, useMemo } from 'react';
import { DATE_TIME_FORMATE } from '../../config';
import { ChainConfig } from '../../model';
import { EllipsisMiddle } from '../EllipsisMiddle';
import { AssetOverview, AssetOverviewProps } from './AssetOverview';
import { ProgressesProps, State } from './Progress';

const { Panel } = Collapse;

export interface RecordProps extends ProgressesProps {
  blockTimestamp: number;
  recipient: string;
  assets: AssetOverviewProps[];
  departure: ChainConfig | null;
  arrival: ChainConfig | null;
}

const PERCENT_HUNDRED = 100;

export function Record(props: PropsWithChildren<RecordProps>) {
  const { assets, recipient, blockTimestamp, departure, arrival, items, children } = props;
  const percent = useMemo(() => {
    const total = items.length;
    const finished = items.filter((item) => item.steps.every((step) => step.state !== State.pending));

    return (finished.length / total) * PERCENT_HUNDRED;
  }, [items]);
  const strokeColor = useMemo(() => {
    if (percent === PERCENT_HUNDRED) {
      return '#10b981';
    }
    return items.find((item) => item.steps.find((step) => step.state === State.error)) ? '#ef4444' : 'normal';
  }, [items, percent]);

  if (!blockTimestamp) {
    return null;
  }

  if (!blockTimestamp) {
    return null;
  }

  return (
    <Collapse key={blockTimestamp} accordion expandIconPosition="right" className="mb-4">
      <Panel
        header={
          <div className="grid grid-cols-3 gap-0 lg:gap-16">
            <div className="flex gap-4 items-center col-span-3 md:col-span-2 md:mr-8">
              <img className="w-6 md:w-12 mx-auto" src={`/image/${departure?.name}-button-mobile.png`} />

              <div className="relative flex items-center justify-around flex-1 col-span-2 h-12 bg-gray-200 dark:bg-gray-900 bg-opacity-50 record-overview">
                <span>
                  {assets.map((asset, index) => (
                    <AssetOverview key={asset.currency ?? index} {...asset} />
                  ))}
                </span>

                <div className="flex items-center">
                  <RightOutlined className="opacity-30" />
                  <RightOutlined className="opacity-60" />
                  <RightOutlined className="opacity-90" />
                </div>

                <Progress
                  percent={percent}
                  steps={items.length}
                  showInfo={false}
                  strokeColor={strokeColor}
                  className="w-full absolute bottom-0 records-progress"
                  style={{ width: 'calc(100% - 3rem)' }}
                />
              </div>

              <img className="w-6 md:w-12 mx-auto" src={`/image/${arrival?.name}-button-mobile.png`} />
            </div>

            <div className="flex flex-col justify-between ml-0 md:ml-4 mt-2 md:mt-0 col-span-3 md:col-span-1">
              <span className="flex items-center mb-2">
                <ClockCircleOutlined />
                <span className="ml-2">{format(fromUnixTime(+blockTimestamp), DATE_TIME_FORMATE)}</span>
              </span>

              <span className="w-full flex items-center">
                <Tooltip title={recipient} placement="top">
                  <ImportOutlined style={{ transform: 'rotateY(180deg)' }} className="mr-2" />
                </Tooltip>

                <EllipsisMiddle className="flex items-center text-right">{recipient}</EllipsisMiddle>
              </span>
            </div>
          </div>
        }
        key={blockTimestamp}
        className="overflow-hidden"
      >
        {children}
      </Panel>
    </Collapse>
  );
}
