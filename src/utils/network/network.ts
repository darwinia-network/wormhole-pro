import { curry, curryRight, isNull } from 'lodash';
import Web3 from 'web3';
import { NetworkEnum, NETWORK_ALIAS, NETWORK_CONFIG, NETWORK_GRAPH, NETWORK_SIMPLE, Vertices } from '../../config';
import { MetamaskNativeNetworkIds, NetConfig, Network, NetworkCategory } from '../../model';

function isSpecifyNetworkType(type: NetworkCategory) {
  const findBy = (name: Network) => NETWORK_CONFIG[name] || null;

  return (network: Network | null) => {
    if (!network) {
      return false;
    }

    let config = findBy(network);

    if (!config) {
      const name = byNetworkAlias(network);

      console.warn(
        `🚀 ~ Can not find the network config by: ${network}. Treat it as an alias, find the a network named ${name} by it `
      );
      if (name) {
        config = findBy(name);
      }
    }

    return config && config.type.includes(type);
  };
}

function byNetworkAlias(network: string): Network | null {
  const alias = NETWORK_ALIAS.entries();
  let res = null;

  for (const [name, value] of alias) {
    if (value.find((item) => item === network.toLowerCase())) {
      res = name;
      break;
    }
  }

  return res;
}

export function getLegalName(network: string): Network | string {
  if (NETWORK_SIMPLE.find((item) => item.name === network)) {
    return network;
  }

  return byNetworkAlias(network) || network;
}

export const isSameNetwork = (net1: NetConfig | null, net2: NetConfig | null) => {
  if ([net1, net2].some(isNull)) {
    return false;
  }

  return typeof net1 === typeof net2 && net1?.fullName === net2?.fullName;
};

export const isInNodeList = (net1: NetConfig | null, net2: NetConfig | null) => {
  if (!net1 || !net2) {
    return true;
  }

  const vertices = NETWORK_GRAPH.get(NetworkEnum[net1.name]) ?? [];
  const nets = vertices.map((ver) => ver.network);

  return nets.includes(net2.name);
};

export const isReachable = curry(isInNodeList); // relation: net1 -> net2 ---- Find the relation by net1
export const isTraceable = curryRight(isInNodeList); // relation: net1 -> net2 ---- Find the relation by net2
export const isSameNetworkCurry = curry(isSameNetwork);
export const isPolkadotNetwork = isSpecifyNetworkType('polkadot');
export const isEthereumNetwork = isSpecifyNetworkType('ethereum');

export function isMetamaskInstalled(): boolean {
  return typeof window.ethereum !== 'undefined' || typeof window.web3 !== 'undefined';
}

export function getNetworkByName(name: Network | null | undefined) {
  if (name) {
    return NETWORK_CONFIG[name];
  }

  console.warn('🚀 Can not find target network config by name: ', name);

  return null;
}

export function getVertices(from: Network, to: Network): Vertices | null {
  if (!from || !to) {
    return null;
  }

  return NETWORK_GRAPH.get(from)?.find((item) => item.network === to) ?? null;
}

export async function isNetworkConsistent(network: Network, id = ''): Promise<boolean> {
  id = id && Web3.utils.isHex(id) ? parseInt(id, 16).toString() : id;
  // id 1: eth mainnet 3: ropsten 4: rinkeby 5: goerli 42: kovan  43: pangolin 44: crab
  const actualId: string = id ? await Promise.resolve(id) : await window.ethereum.request({ method: 'net_version' });
  const storedId = NETWORK_CONFIG[network].ethereumChain.chainId;

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
  const params = NETWORK_CONFIG[network].ethereumChain;

  return ids.includes(+params.chainId);
}

export function hasBridge(from: Network, to: Network): boolean {
  return !!getVertices(from, to);
}

export function isBridgeAvailable(from: Network, to: Network): boolean {
  const bridge = getVertices(from, to);

  return !!bridge && bridge.status === 'available';
}

export function getNetworkCategory(network: Network | NetConfig): NetworkCategory | null {
  const config = typeof network === 'string' ? NETWORK_CONFIG[network] : network;

  if (config.type.includes('polkadot')) {
    return 'polkadot';
  } else if (config.type.includes('ethereum')) {
    return 'ethereum';
  }

  return null;
}
