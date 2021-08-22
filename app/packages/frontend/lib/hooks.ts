import TransferArt from '../artifacts/contracts/TransferArt.sol/TransferArt.json'
import { TransferArt as TRANSFER_ART_CONTRACT_ADDRESS } from '../artifacts/contracts/contractAddress'
import { useContractCall } from '@usedapp/core'
import { Interface } from '@ethersproject/abi'
import { Falsy } from '@usedapp/core/dist/esm/src/model/types'

export function ownerOf(tokenId: string | Falsy, contractAddress: string, abi: Interface): string | undefined {
  const [owner] =
    useContractCall(
      tokenId && {
        abi,
        address: contractAddress,
        method: 'ownerOf',
        args: [tokenId],
      }
    ) ?? []
  return owner;
}

export function useOwner(tokenId: string | Falsy): string | undefined {
  return ownerOf(tokenId, TRANSFER_ART_CONTRACT_ADDRESS, new Interface(TransferArt.abi))
}
