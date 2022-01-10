import { isEqual } from 'lodash';
import { Arrival, Bridge, BridgeConfig, Departure } from '../../model';
import { BRIDGES } from '../bridge';

const isPro = process.env.REACT_APP_HOST_TYPE === 'prod';

export const NETWORK_GRAPH = new Map(
  BRIDGES.reduce((acc: [Departure, Arrival[]][], bridge: Bridge<BridgeConfig>) => {
    if (isPro && !bridge.stable) {
      return acc;
    }

    const check = ([ver1, ver2]: [Departure, Departure]) => {
      const departure = acc.find((item) => isEqual(item[0], ver1));
      if (departure) {
        departure[1].push(ver2);
      } else {
        acc.push([{ ...ver1 }, [{ ...ver2 }]]);
      }
    };

    check(bridge.issuing);
    check(bridge.redeem);

    return acc;
  }, [])
);

export const AIRDROP_GRAPH = new Map<Departure, Arrival[]>([
  [{ network: 'ethereum', mode: 'native' }, [{ network: 'crab', mode: 'native' }]],
  [{ network: 'tron', mode: 'native' }, [{ network: 'crab', mode: 'native' }]],
]);
