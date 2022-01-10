import { useCallback } from 'react';
import { RegisterStatus } from '../../../config';
import { CrossChainComponentProps, CrossChainDirection, DVMPayload, EthereumDVMBridgeConfig } from '../../../model';
import { getBridge, redeemErc20 } from '../../../utils';
import { DVM } from '../DVM';

/* ----------------------------------------------Base info helpers-------------------------------------------------- */

/* ----------------------------------------------Tx section-------------------------------------------------- */

/* ----------------------------------------------Main Section-------------------------------------------------- */

/**
 * @description test chain: ropsten -> pangolin dvm
 */
export function Ethereum2DarwiniaDVM({ form, setSubmit, direction }: CrossChainComponentProps<DVMPayload>) {
  const spenderResolver = useCallback((dir: CrossChainDirection) => {
    const bridge = getBridge<EthereumDVMBridgeConfig>(dir);
    return Promise.resolve(bridge.config.contracts.issuing ?? '');
  }, []);

  return (
    <DVM
      form={form}
      direction={direction}
      setSubmit={setSubmit}
      transform={redeemErc20}
      spenderResolver={spenderResolver}
      canRegister
      tokenRegisterStatus={RegisterStatus.unregister}
    />
  );
}
