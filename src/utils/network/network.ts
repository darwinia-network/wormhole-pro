import { ApiPromise } from '@polkadot/api';
import { curry, curryRight, has, isEqual, isNull, omit, once, upperFirst } from 'lodash';
import Web3 from 'web3';
import {
  AIRDROP_GRAPH,
  CROSS_CHAIN_NETWORKS,
  NETWORK_CONFIGURATIONS,
  NETWORK_GRAPH,
  NETWORK_SIMPLE,
  tronConfig,
} from '../../config';
import {
  Arrival,
  ChainConfig,
  Connection,
  Departure,
  DVMChainConfig,
  EthereumChainConfig,
  EthereumConnection,
  MetamaskNativeNetworkIds,
  Network,
  NetworkCategory,
  NetworkMode,
  NoNullFields,
  PolkadotConnection,
  Vertices,
} from '../../model';
import { entrance } from './entrance';

function isSpecifyNetworkType(type: NetworkCategory) {
  const findBy = (name: Network) => NETWORK_CONFIGURATIONS.find((item) => item.name === name) ?? null;

  return (network: Network | null | undefined) => {
    if (!network) {
      return false;
    }

    let config = findBy(network);

    if (!config) {
      const name = byNetworkAlias(network);

      console.warn(
        `🚀 ~ Can not find the network config by: ${network}. Treat it as an alias, find a network named ${name} by it `
      );
      if (name) {
        config = findBy(name);
      }
    }

    return !!config && config.type.includes(type);
  };
}

function byNetworkAlias(network: string): Network | null {
  const minLength = 3;
  const allowAlias: (full: string, at?: number) => string[] = (name, startAt = minLength) => {
    const len = name.length;
    const shortestName = name.slice(0, startAt);

    return new Array(len - startAt).fill('').map((_, index) => shortestName + name.substr(startAt, index));
  };

  const alias = new Map([['ethereum', [...allowAlias('ethereum')]]]);
  let res = null;

  for (const [name, value] of alias) {
    if (value.find((item) => item === network.toLowerCase())) {
      res = name;
      break;
    }
  }

  return res as Network | null;
}

export function getLegalName(network: string): Network | string {
  if (NETWORK_SIMPLE.find((item) => item.name === network)) {
    return network;
  }

  return byNetworkAlias(network) || network;
}

const isSameNetwork = (net1: ChainConfig | null, net2: ChainConfig | null) => {
  if ([net1, net2].some(isNull)) {
    return false;
  }

  return typeof net1 === typeof net2 && net1?.name === net2?.name;
};

const getArrivals = (source: Map<Departure, Arrival[]>, departure: ChainConfig) => {
  const mode: NetworkMode = getNetworkMode(departure);
  const target = [...source].find(([item]) => item.network === departure.name && item.mode === mode);

  return target ? target[1] : [];
};

const isInNodeList = (source: Map<Departure, Arrival[]>) => (net1: ChainConfig | null, net2: ChainConfig | null) => {
  if (!net1 || !net2) {
    return true;
  }

  const vertices = getArrivals(source, net1);

  return !!vertices.find((item) => item.network === net2.name && item.mode === getNetworkMode(net2));
};

const isInCrossList = isInNodeList(NETWORK_GRAPH);
const isInAirportList = isInNodeList(AIRDROP_GRAPH);

export const isReachable = (net: ChainConfig | null, isCross = true) =>
  isCross ? curry(isInCrossList)(net) : curry(isInAirportList)(net); // relation: net1 -> net2 ---- Find the relation by net1
export const isTraceable = (net: ChainConfig | null, isCross = true) =>
  isCross ? curryRight(isInCrossList)(net) : curryRight(isInAirportList)(net); // relation: net1 -> net2 ---- Find the relation by net2
export const isSameNetworkCurry = curry(isSameNetwork);
export const isPolkadotNetwork = isSpecifyNetworkType('polkadot');
export const isEthereumNetwork = isSpecifyNetworkType('ethereum');
export const isTronNetwork = isSpecifyNetworkType('tron');

export function isMetamaskInstalled(): boolean {
  return typeof window.ethereum !== 'undefined' || typeof window.web3 !== 'undefined';
}

/**
 * Unlike metamask, it does not lead the user to unlock the wallet.
 * Tron link may not be initialized, so if it is not detected successfully, delay 2 seconds and detect again.
 * FIXME: If the wallet status changes from unlocked to locked, the account of the last user use will still be available
 */
export async function isTronLinkReady(): Promise<boolean> {
  if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
    return true;
  }

  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve(window.tronWeb && window.tronWeb.defaultAddress.base58);
      // eslint-disable-next-line no-magic-numbers
    }, 2000);
  });
}

export function getNetworkMode(config: ChainConfig): NetworkMode {
  return has(config, 'dvm') ? 'dvm' : 'native';
}

export function isDVM(config: ChainConfig): boolean {
  return getNetworkMode(config) === 'dvm';
}

/**
 * @description map chain config to vertices
 */
export function chainConfigToVertices(config: ChainConfig) {
  const vertices: Vertices = { network: config.name, mode: getNetworkMode(config) };

  return vertices;
}

/**
 * @description map vertices to chain config
 */
export function verticesToChainConfig(vertices: Vertices) {
  const { mode, network } = vertices;

  const config = findNetworkConfig(network);

  return mode === 'dvm' ? (omit(config, 'dvm') as ChainConfig) : config;
}

export function isSameNetConfig(config1: ChainConfig | null, config2: ChainConfig | null): boolean {
  if (!config1 || !config2) {
    return [config1, config2].every(isNull);
  }

  return (
    isEqual(config1, config2) || (config1.name === config2.name && getNetworkMode(config1) === getNetworkMode(config2))
  );
}

export function getNetworkByName(name: Network | null | undefined): ChainConfig | null {
  if (name) {
    return NETWORK_CONFIGURATIONS.find((item) => item.name === name) ?? null;
  }

  console.warn('🚀 Can not find target network config by name: ', name);

  return null;
}

// eslint-disable-next-line complexity
export function getArrival(from: ChainConfig | null | undefined, to: ChainConfig | null | undefined): Arrival | null {
  if (!from || !to) {
    return null;
  }

  const mode = getNetworkMode(from);
  let departure = NETWORK_CONFIGURATIONS.find((config) => config.name === from.name) as ChainConfig;

  if (mode === 'native') {
    departure = omit(departure, 'dvm');
  }

  if (mode === 'dvm' && !Object.prototype.hasOwnProperty.call(departure, 'dvm')) {
    console.warn('Try to get arrival config in dvm mode, but the config does not include dvm info');
  }

  return getArrivals(NETWORK_GRAPH, departure).find((item) => item.network === to.name) ?? null;
}

export async function isNetworkConsistent(network: Network, id = ''): Promise<boolean> {
  id = id && Web3.utils.isHex(id) ? parseInt(id, 16).toString() : id;
  // id 1: eth mainnet 3: ropsten 4: rinkeby 5: goerli 42: kovan  43: pangolin 44: crab
  const actualId: string = id ? await Promise.resolve(id) : await window.ethereum.request({ method: 'net_version' });
  const chain = getNetworkByName(network) as EthereumChainConfig;
  const storedId = chain.ethereumChain.chainId;

  return storedId === actualId;
}

export function isNativeMetamaskChain(network: Network): boolean {
  const ids = [
    MetamaskNativeNetworkIds.ethereum,
    MetamaskNativeNetworkIds.ropsten,
    MetamaskNativeNetworkIds.rinkeby,
    MetamaskNativeNetworkIds.goerli,
    MetamaskNativeNetworkIds.kovan,
  ];
  const chain = getNetworkByName(network) as EthereumChainConfig;

  return ids.includes(+chain.ethereumChain.chainId);
}

export function getNetworkCategory(config: ChainConfig): NetworkCategory | null {
  if (config.type.includes('polkadot')) {
    return isDVM(config) ? 'dvm' : 'polkadot';
  } else if (config.type.includes('ethereum')) {
    return 'ethereum';
  } else if (config.type.includes('tron')) {
    return 'tron';
  }

  return null;
}

/**
 * @returns - current active account in metamask;
 */
export async function getMetamaskActiveAccount() {
  if (typeof window.ethereum === 'undefined') {
    return;
  }

  await window.ethereum.request({ method: 'eth_requestAccounts' });

  const accounts = await window.ethereum.request({
    method: 'eth_accounts',
  });

  // metamask just return the active account now, so the result array contains only one account;
  return accounts[0];
}

/**
 *
 * @params network id
 * @description is actual network id match with expected.
 */
export async function isNetworkMatch(expectNetworkId: number): Promise<boolean> {
  const web3 = entrance.web3.getInstance(entrance.web3.defaultProvider);
  const networkId = await web3.eth.net.getId();

  return expectNetworkId === networkId;
}

export function getDisplayName(config: ChainConfig): string {
  const mode = getNetworkMode(config);
  const name = upperFirst(config.name);

  return mode === 'dvm' ? `${name}-Smart` : name;
}

export function getVerticesFromDisplayName(name: string): Vertices {
  const [network, mode] = name.split('-') as [Network, string];

  return { network, mode: ['smart', 'dvm'].includes(mode?.toLowerCase()) ? 'dvm' : 'native' };
}

// eslint-disable-next-line complexity
export async function getConfigByConnection(connection: Connection): Promise<ChainConfig | null> {
  if (connection.type === 'metamask') {
    const targets = CROSS_CHAIN_NETWORKS.filter((item) => {
      const chain = (item as unknown as EthereumChainConfig).ethereumChain;

      return chain && isChainIdEqual(chain.chainId, (connection as EthereumConnection).chainId);
    });

    return (targets.length > 1 ? targets.find((item) => (item as unknown as DVMChainConfig).dvm) : targets[0]) ?? null;
  }

  if (connection.type === 'polkadot' && connection.api) {
    const { api } = connection as NoNullFields<PolkadotConnection>;

    await waitUntilConnected(api);

    const chain = await api?.rpc.system.chain();
    const network = chain.toHuman()?.toLowerCase() as Network;
    const target = findNetworkConfig(network);

    return chain ? omit(target, 'dvm') : null;
  }

  if (connection.type === 'tron') {
    return tronConfig;
  }

  return null;
}

export async function waitUntilConnected(api: ApiPromise): Promise<null> {
  await api.isReady;

  return new Promise((resolve) => {
    if (!api.isConnected) {
      api.on(
        'connected',
        once(() => resolve(null))
      );
    } else {
      resolve(null);
    }
  });
}

export function isChainIdEqual(id1: string | number, id2: string | number): boolean {
  id1 = Web3.utils.toHex(id1);
  id2 = Web3.utils.toHex(id2);

  return id1 === id2;
}

export function getCrossChainArrivals(departure: ChainConfig): Arrival[] {
  return getArrivals(NETWORK_GRAPH, departure);
}

export function findNetworkConfig(network: Network): ChainConfig {
  const target = NETWORK_CONFIGURATIONS.find((item) => item.name === network);

  if (!target) {
    throw new Error(`Can not find chain configuration by ${network}`);
  }

  return target;
}
