import { Arrival, Departure } from '../bridge';
import { Network } from '../network/network';
import { DarwiniaListRes } from './api';

export interface Paginator {
  row: number;
  page: number;
}

export interface HistoryReq {
  address: string;
  direction: [Departure, Arrival];
  paginator: Paginator;
  confirmed: boolean | null;
}

/* ------------------------------------E2D section-------------------------------------------- */

export interface Ethereum2DarwiniaRecord {
  address: string;
  amount: string;
  block_num: number;
  block_timestamp: number;
  chain: Network;
  created_at: string;
  currency: string;
  target: string;
  tx: string;
}
export interface Ethereum2DarwiniaRingBurnRecord extends Ethereum2DarwiniaRecord {
  id: number;
}

export type Ethereum2DarwiniaRingBurnHistoryRes<R = Ethereum2DarwiniaRingBurnRecord> = DarwiniaListRes<R>;

export interface Ethereum2DarwiniaRedeemRecord extends Ethereum2DarwiniaRecord {
  darwinia_tx: string;
  deposit: string; // json string
  is_relayed: boolean;
}

export type Ethereum2DarwiniaRedeemHistoryRes<R = Ethereum2DarwiniaRedeemRecord> = DarwiniaListRes<R>;

/* ------------------------------------D2E section-------------------------------------------- */

export interface Darwinia2EthereumRecord {
  account_id: string;
  block_hash: string;
  block_header: string;
  block_num: number;
  block_timestamp: number;
  extrinsic_index: string;
  kton_value: string;
  mmr_index: number;
  mmr_root: string;
  ring_value: string;
  signatures: string;
  target: string;
  tx: string;
}

export type Darwinia2EthereumHistoryRes<R = Darwinia2EthereumRecord> = DarwiniaListRes<R> & {
  implName: string;
  best: number;
  MMRRoot: string;
};

export type Darwinia2EthereumMeta = Pick<Darwinia2EthereumHistoryRes, 'best' | 'MMRRoot'>;

/* ------------------------------------ERC20 section-------------------------------------------- */

export interface Erc20RegisterProof {
  extrinsic_index: string;
  account_id: string;
  block_num: number;
  block_hash: string;
  backing: string;
  source: string;
  target: string;
  block_timestamp: number;
  mmr_index: number;
  mmr_root: string;
  signatures: string;
  block_header: string;
  tx: string;
}

export type Erc20RegisterProofRes = Erc20RegisterProof | null;

/* ------------------------------------S2S section-------------------------------------------- */

export interface SimpleBlock {
  blockHash: string;
  extrinsicHash: string;
  // eslint-disable-next-line id-denylist
  number: number;
  specVersion: number;
}

export interface SubstrateDVM2SubstrateRecord {
  lane_id: string;
  nonce: string;
  request_transaction: string;
  response_transaction: string;
  sender: string;
  recipient: string;
  token: string;
  amount: string;
  // eslint-disable-next-line no-magic-numbers
  result: 0 | 1 | 2;
  start_timestamp: string;
  end_timestamp: string;
}

export interface Substrate2SubstrateDVMRecord {
  laneId: string;
  nonce: string;
  requestTxHash: string;
  responseTxHash: string;
  sender: string;
  recipient: string;
  token: string;
  amount: string;
  // eslint-disable-next-line no-magic-numbers
  result: 0 | 1 | 2;
  startTimestamp: string;
  endTimestamp: string;
}

export interface SubstrateDVM2SubstrateRecordsRes {
  burnRecordEntities: SubstrateDVM2SubstrateRecord[];
}

export interface SubstrateDVM2SubstrateRecordRes {
  burnRecordEntity: SubstrateDVM2SubstrateRecord;
}

export interface Substrate2SubstrateDVMRecordsRes {
  s2sEvents: {
    totalCount: number;
    nodes: (Substrate2SubstrateDVMRecord & { id: string })[];
  };
}
export interface Substrate2SubstrateDVMRecordRes {
  s2sEvent: Substrate2SubstrateDVMRecord;
}

export interface BridgeDispatchEventRecord {
  data: string; // json string [ChainId, [LaneId, MessageNonce], DispatchResult]
  isSuccess: boolean;
  method:
    | 'MessageRejected'
    | 'MessageVersionSpecMismatch'
    | 'MessageWeightMismatch'
    | 'MessageSignatureMismatch'
    | 'MessageCallDecodeFailed'
    | 'MessageCallRejected'
    | 'MessageDispatchPaymentFailed'
    | 'MessageDispatched';
  block: SimpleBlock;
  index: number;
}

export interface BridgeDispatchEventRes {
  bridgeDispatchEvent: BridgeDispatchEventRecord;
}

/* ------------------------------------S2DVM section-------------------------------------------- */

interface Transfer {
  amount: string;
  fee: string;
  fromId: string;
  timestamp: string;
  toId: string;
  tokenId: 'balances' | 'kton';
  // eslint-disable-next-line id-denylist
  block: { blockHash: string; number: number; specVersion: number };
}

export interface Substrate2DVMRecordsRes {
  transfers: {
    totalCount: number;
    nodes: Transfer[];
  };
}

export type DVM2SubstrateRecordsRes = Substrate2DVMRecordsRes;

export type Substrate2DVMRecord = Transfer;

export type DVM2SubstrateRecord = Transfer;
