import { THEME } from '../config';
import { HashInfo } from '../utils';
import { Network, ChainConfig } from './network';

export interface StorageInfo extends HashInfo {
  theme?: THEME;
  enableTestNetworks?: boolean;
  config?: Partial<ChainConfig>;
  custom?: Network[];
}
