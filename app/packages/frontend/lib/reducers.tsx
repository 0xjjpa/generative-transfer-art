import { TransferArt as TRANSFER_ART_CONTRACT_ADDRESS } from '../artifacts/contracts/contractAddress'
import TransferArt from '../artifacts/contracts/TransferArt.sol/TransferArt.json'
import { Web3Provider } from '@ethersproject/providers'
import { TransferArt as TransferArtType } from '../types/typechain'
import { ethers } from 'ethers'
import { NftPropsType } from '../components/atoms/NFTProps'


export type StateType = {
  balance: string
  tokenIds: string[]
  address: string
  nftProps: {
    [tokenId: string]: NftPropsType
  }
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
  | {
    type: 'SET_PROPS_PER_TOKEN_ID'
    tokenId: string
    nftProps: NftPropsType
  }

/**
 * Component
 */
export const initialState: StateType = {
  balance: '',
  tokenIds: [],
  address: '',
  nftProps: {}
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
    case 'SET_PROPS_PER_TOKEN_ID':
      return {
        ...state,
        nftProps: { [action.tokenId]: action.nftProps, ...state.nftProps },
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
