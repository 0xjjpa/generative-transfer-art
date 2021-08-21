import TransferArt from '../artifacts/contracts/TransferArt.sol/TransferArt.json'
import { TransferArt as TRANSFER_ART_CONTRACT_ADDRESS } from '../artifacts/contracts/contractAddress'
import { useContractCall } from '@usedapp/core'
import { Interface } from '@ethersproject/abi'
import { Falsy } from '@usedapp/core/dist/esm/src/model/types'

export function useOwner(tokenId: string | Falsy): string | undefined {
  const [owner] =
    useContractCall(
      tokenId && {
        abi: new Interface(TransferArt.abi),
        address: TRANSFER_ART_CONTRACT_ADDRESS,
        method: 'ownerOf',
        args: [tokenId],
      }
    ) ?? []
  return owner
}
