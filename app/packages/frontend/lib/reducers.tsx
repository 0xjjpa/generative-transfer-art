import { TransferArt as TRANSFER_ART_CONTRACT_ADDRESS } from '../artifacts/contracts/contractAddress'
import TransferArt from '../artifacts/contracts/TransferArt.sol/TransferArt.json'
import { Web3Provider } from '@ethersproject/providers'
import { TransferArt as TransferArtType } from '../types/typechain'
import { ethers } from 'ethers'

/**
 * Prop Types
 */
export type StateType = {
  balance: string
  tokenIds: string[]
  address: string
}
export type ActionType =
  | {
      type: 'SET_BALANCE'
      balance: StateType['balance']
    }
  | {
      type: 'SET_TOKEN_IDS'
      tokenIds: StateType['tokenIds']
    }
  | {
      type: 'SET_ADDRESS_SEARCH'
      address: StateType['address']
    }

/**
 * Component
 */
export const initialState: StateType = {
  balance: '',
  tokenIds: [],
  address: '',
}

export function reducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    case 'SET_BALANCE':
      return {
        ...state,
        balance: action.balance,
      }
    case 'SET_TOKEN_IDS':
      return {
        ...state,
        tokenIds: action.tokenIds,
      }
    case 'SET_ADDRESS_SEARCH':
      return {
        ...state,
        address: action.address,
      }
    default:
      throw new Error()
  }
}

export async function fetchBalance({
  provider,
  address,
  dispatch,
}: {
  provider: Web3Provider
  address: string
  dispatch: React.Dispatch<ActionType>
}): Promise<void> {
  if (provider) {
    const contract = new ethers.Contract(
      TRANSFER_ART_CONTRACT_ADDRESS,
      TransferArt.abi,
      provider
    ) as TransferArtType
    try {
      let invalidTokenIds = 0
      const totalTokensOwnedByAccount = await contract.balanceOf(address)
      const promisedTokenIdsByAccount = [
        ...Array(+totalTokensOwnedByAccount),
      ].map((_, index) => contract.tokenOfOwnerByIndex(address, index))
      const tokenIdsByAccount = (
        await Promise.all(promisedTokenIdsByAccount)
      ).map((tokenId) => tokenId.toString())
      const filteredTokensId = tokenIdsByAccount.filter((tokenId) => {
        if (tokenId != '0') {
          return true
        } else {
          invalidTokenIds++;
          return false;
        }
      })
      console.log("FITER", filteredTokensId)
      dispatch({
        type: 'SET_BALANCE',
        balance: `${+totalTokensOwnedByAccount.toString() - invalidTokenIds}`,
      })
      dispatch({
        type: 'SET_TOKEN_IDS',
        tokenIds: filteredTokensId,
      })
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('Error: ', err)
    }
  }
}
