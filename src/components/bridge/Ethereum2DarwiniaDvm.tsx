import React from 'react';
import { BridgeFormProps, DVMTransfer } from '../../model';
import { DVM } from './Dvm';

/* ----------------------------------------------Base info helpers-------------------------------------------------- */

/* ----------------------------------------------Tx section-------------------------------------------------- */

/* ----------------------------------------------Main Section-------------------------------------------------- */

/**
 * @description test chain: ropsten -> pangolin dvm
 */
export function Ethereum2DarwiniaDVM({ form, setSubmit }: BridgeFormProps<DVMTransfer>) {
  return <DVM form={form} setSubmit={setSubmit} isRedeem={true} />;
}
