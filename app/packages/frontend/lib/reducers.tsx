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
}
export type ActionType = {
  type: 'SET_BALANCE'
  balance: StateType['balance']
}

/**
 * Component
 */
export const initialState: StateType = {
  balance: '',
}

export function reducer(state: StateType, action: ActionType): StateType {
    switch (action.type) {
      case 'SET_BALANCE':
        return {
          ...state,
          balance: action.balance,
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
      const balance = await contract.balanceOf(address)
      dispatch({ type: 'SET_BALANCE', balance: balance.toString() })
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('Error: ', err)
    }
  }
}
