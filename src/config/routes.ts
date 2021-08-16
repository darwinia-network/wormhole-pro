import { RouteProps } from 'react-router-dom';
import { Page404 } from '../components/Page404';
import { AirdropHistory } from '../pages/AirdropHistory';
import { HistoryRecords } from '../pages/CrossHistory';
import { Erc20Register } from '../pages/Erc20Register';
import { Home } from '../pages/Home';

export enum Path {
  root = '/',
  history = '/history',
  airdrop = '/airdrop',
  airdropHistory = '/airdropHistory',
  register = '/register',
}

export const routes: RouteProps[] = [
  {
    exact: true,
    path: Path.root,
    children: Home,
  },
  {
    exact: true,
    path: Path.history,
    children: HistoryRecords,
  },
  {
    exact: true,
    path: Path.airdrop,
    component: Home,
  },
  {
    exact: true,
    path: Path.airdropHistory,
    children: AirdropHistory,
  },
  {
    exact: true,
    path: Path.register,
    component: Erc20Register,
  },
  {
    path: '*',
    children: Page404,
  },
];
