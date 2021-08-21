import { useEthers } from '@usedapp/core'
import {
  DEFAULT_COLLECTION_SIZE,
} from '../../lib/constants'
import { TransferArt as TRANSFER_ART_CONTRACT_ADDRESS } from '../../artifacts/contracts/contractAddress'
import { useState } from 'react'
import { ethers } from 'ethers'
import { NftProvider } from 'use-nft'
import { Box } from '@chakra-ui/layout'
import { Nft } from '../atoms/NFT'
import { TANavigator } from '../atoms/TANavigator'
import { Divider, SimpleGrid } from '@chakra-ui/react'
import { getCurrentProvider } from '../../lib/connectors'

export const TACollection = () => {
  const [page, setPage] = useState(0)
  const { library } = useEthers()
  const provider = getCurrentProvider(library)
  const tokenIds = [...Array(DEFAULT_COLLECTION_SIZE)].map(
    (_, tokenId) => `${page * DEFAULT_COLLECTION_SIZE + tokenId + 1}`
  )
  return (
    <NftProvider
      fetcher={['ethers', { ethers, provider: library || provider }]}
    >
      <Box>
        <TANavigator page={page} setPage={setPage} />
        <Divider m="5" />
        <SimpleGrid columns={[1, 2, 2, 3]} spacing={5}>
          {tokenIds.map((tokenId) => (
            <Box key={tokenId} background="blackAlpha.100" borderRadius="5">
              <Nft address={TRANSFER_ART_CONTRACT_ADDRESS} tokenId={tokenId} />
            </Box>
          ))}
        </SimpleGrid>
        <Divider m="5" />
        <TANavigator page={page} setPage={setPage} />
      </Box>
    </NftProvider>
  )
}
