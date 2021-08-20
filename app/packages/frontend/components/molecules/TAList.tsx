import { TransferArt as TRANSFER_ART_CONTRACT_ADDRESS } from '../../artifacts/contracts/contractAddress'
import { useEffect } from 'react'
import { ethers } from 'ethers'
import { NftProvider } from 'use-nft'
import { useEthers } from '@usedapp/core'
import { Box, Text, SimpleGrid } from '@chakra-ui/layout'
import { Nft } from '../atoms/NFT'

export const TAList = ({
  balance,
  tokenIds,
  loadBalance,
}: {
  balance: string
  tokenIds: string[]
  loadBalance: () => void
}) => {
  const { library } = useEthers()
  useEffect(() => {
    loadBalance()
  }, [])

  return (
    <NftProvider fetcher={['ethers', { ethers, provider: library }]}>
      <Box>
        <Text fontSize="lg">Owned {balance}</Text>
        <SimpleGrid columns={[1, 2, 2, 3]} spacing={10}>
          {tokenIds.map((tokenId) => (
            <Box key={tokenId}>
              <Nft address={TRANSFER_ART_CONTRACT_ADDRESS} tokenId={tokenId} />
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </NftProvider>
  )
}
