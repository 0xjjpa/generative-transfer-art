import { ChainId } from "@usedapp/core"

export const INFURA_ID = '83ef2c49b4b04e5f84935bc3319d7aa7'
export const WRAPPED_TOKEN_CONTRACT = '0xE796EbaCf88d4785bBc64cabc828f81FB8f7A9b7'
export const PROVIDERS = {
  [ChainId.Mainnet]: `https://mainnet.infura.io/v3/${INFURA_ID}`,
  [ChainId.Hardhat]: 'http://localhost:8555',
  [ChainId.Localhost]: 'http://localhost:8545',
}
export const DEFAULT_COLLECTION_SIZE = 9
export const DEFAULT_CHAIN_ID = ChainId.Mainnet
export const DEFAULT_NETWORK = PROVIDERS[DEFAULT_CHAIN_ID]
export const INFURA_CONFIGURATION = { infura: INFURA_ID }