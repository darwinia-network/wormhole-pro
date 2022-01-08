import { PangoroConfig } from '../../model';

export const pangoroConfig: PangoroConfig = {
  facade: {
    logo: '/image/pangoro.png',
    logoMinor: '/image/pangoro.png',
    logoWithText: '',
  },
  isTest: true,
  name: 'pangoro',
  provider: {
    etherscan: '',
    rpc: 'wss://pangoro-rpc.darwinia.network',
  },
  ss58Prefix: 18,
  type: ['polkadot', 'darwinia'],
};
