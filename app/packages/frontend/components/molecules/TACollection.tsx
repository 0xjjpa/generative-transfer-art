import { useEthers } from '@usedapp/core'
import { getDefaultProvider } from 'ethers'
import {
  DEFAULT_COLLECTION_SIZE,
  DEFAULT_NETWORK,
  INFURA_CONFIGURATION,
} from '../../lib/constants'
import { TransferArt as TRANSFER_ART_CONTRACT_ADDRESS } from '../../artifacts/contracts/contractAddress'
import { useState } from 'react'
import { ethers } from 'ethers'
import { NftProvider } from 'use-nft'
import { Box, Text, Flex } from '@chakra-ui/layout'
import { Nft } from '../atoms/NFT'
import { Divider, SimpleGrid } from '@chakra-ui/react'
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'

export const TACollection = () => {
  const [page, setPage] = useState(0);
  const { library } = useEthers()
  const provider =
    library || getDefaultProvider(DEFAULT_NETWORK, INFURA_CONFIGURATION)
  const tokenIds = [...Array(DEFAULT_COLLECTION_SIZE)].map(
    (_, tokenId) => `${page * DEFAULT_COLLECTION_SIZE + tokenId + 1}`
  )
  const nextPage = () => setPage(page + 1);
  const prevPage = () => setPage(page - 1);
  return (
    <NftProvider
      fetcher={['ethers', { ethers, provider: library || provider }]}
    >
      <Box>
        <Flex justifyContent="space-around">
          { page != 0 && <Flex alignItems="center" cursor="pointer" onClick={prevPage}>
            <ArrowBackIcon mr="2"/>
            <Text>Prev Page</Text>
          </Flex> }
          <Flex alignItems="center" cursor="pointer" onClick={nextPage}>
            <Text>Next Page</Text>
            <ArrowForwardIcon ml="2"/>
          </Flex>
        </Flex>
        <Divider m="5"/>
        <SimpleGrid columns={3} spacing={10}>
          {tokenIds.map((tokenId) => (
            <Nft
              key={tokenId}
              address={TRANSFER_ART_CONTRACT_ADDRESS}
              tokenId={tokenId}
            />
          ))}
        </SimpleGrid>
      </Box>
    </NftProvider>
  )
}
