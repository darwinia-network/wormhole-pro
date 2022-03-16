import { omit } from 'lodash';
import { pangolinConfig } from '../../../config/network';
import { Bridge } from '../../../model';
import { crabConfig } from '../../../config/network';
import { SubstrateDVMBridgeConfig } from '../model';

const crabCrabDVMConfig: SubstrateDVMBridgeConfig = {
  specVersion: 1180,
  api: {
    subql: 'https://api.subquery.network/sq/darwinia-network/wormhole-',
  },
};

/**
 * smart app: crab
 */
export const crabCrabDVM = new Bridge<SubstrateDVMBridgeConfig>(
  omit(crabConfig, 'dvm'),
  crabConfig,
  crabCrabDVMConfig,
  { activeAssistantConnection: true, stable: false }
);

const pangolinPangolinDVMConfig: SubstrateDVMBridgeConfig = {
  specVersion: 27020,
  api: {
    subql: 'https://api.subquery.network/sq/darwinia-network/wormhole-',
  },
};

/**
 * smart app: testnet
 */
export const pangolinPangolinDVM = new Bridge<SubstrateDVMBridgeConfig>(
  omit(pangolinConfig, 'dvm'),
  pangolinConfig,
  pangolinPangolinDVMConfig,
  { activeAssistantConnection: true, stable: false }
);
