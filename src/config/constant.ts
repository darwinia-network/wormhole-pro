/* eslint-disable no-magic-numbers */
export const LONG_DURATION = 10 * 1000;

export const MIDDLE_DURATION = 5 * 1000;

export const SHORT_DURATION = 3 * 1000;

export const DATE_FORMAT = 'yyyy/MM/dd';

export const DATE_TIME_FORMATE = 'yyyy/MM/dd HH:mm:ss';

export enum FORM_CONTROL {
  amount = 'amount',
  asset = 'asset',
  assets = 'assets',
  deposit = 'deposit',
  recipient = 'recipient',
  sender = 'sender',
  direction = 'direction',
}

export enum Path {
  root = '/',
  history = '/history',
  airdrop = '/airdrop',
  airdropHistory = '/airdropHistory',
  register = '/register',
  configure = '/configure',
}
