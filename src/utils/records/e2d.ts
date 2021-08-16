import { catchError, EMPTY, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { DarwiniaApiPath, NETWORK_CONFIG } from '../../config';
import { Network, Paginator, RedeemHistoryRes, RingBurnHistoryRes } from '../../model';
import { apiUrl } from '../helper';
import { rxGet } from './api';

export function queryE2DRecords(
  network: Network | null,
  address: string | null,
  paginator?: Paginator
): Observable<RedeemHistoryRes> {
  if (network === null || address === null || address === '') {
    return EMPTY;
  }

  const api = NETWORK_CONFIG[network].api.dapp;
  const params = {
    address,
    ...(paginator ?? { row: 50, page: 0 }),
  };

  return rxGet<RedeemHistoryRes>({ url: apiUrl(api, DarwiniaApiPath.redeem), params }).pipe(
    map(
      (res) =>
        res || {
          count: 0,
          list: [],
        }
    ),
    catchError((err) => {
      console.error(
        '%c [ e2d cross chain api request error: ]',
        'font-size:13px; background:pink; color:#bf2c9f;',
        err
      );
      return of({ list: [], count: 0 });
    })
  );
}

export function queryE2DGenesisRecords(
  network: Network | null,
  address: string | null,
  paginator?: Paginator
): Observable<RingBurnHistoryRes> {
  if (network === null || address === null || address === '') {
    return EMPTY;
  }

  const api = NETWORK_CONFIG[network].api.dapp;
  const params = {
    address,
    ...(paginator ?? { row: 50, page: 0 }),
  };

  return rxGet<RingBurnHistoryRes & { isGenesis: boolean }>({
    url: apiUrl(api, DarwiniaApiPath.ringBurn),
    params,
  }).pipe(
    map((res) => {
      const { count, list } = res!;

      return {
        count,
        list: (list || []).map((item) => ({ ...item, isGenesis: true })),
      };
    }),
    catchError((err) => {
      console.error('%c [ genesis api request error: ]', 'font-size:13px; background:pink; color:#bf2c9f;', err);
      return [];
    })
  );
}
