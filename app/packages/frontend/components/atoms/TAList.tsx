import { TransferArt as TRANSFER_ART_CONTRACT_ADDRESS } from '../../artifacts/contracts/contractAddress'
import { useEffect } from 'react'
import { ethers } from 'ethers'
import { NftProvider, useNft } from 'use-nft'
import { useEthers } from '@usedapp/core'
import { Box, Text, Flex } from '@chakra-ui/layout'

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
        <Flex>
          {tokenIds.map((tokenId) => (
            <Nft
              key={tokenId}
              address={TRANSFER_ART_CONTRACT_ADDRESS}
              tokenId={tokenId}
            />
          ))}
        </Flex>
      </Box>
    </NftProvider>
  )
}

function Nft({ address, tokenId }: { address: string; tokenId: string }) {
  const { loading, error, nft } = useNft(address, tokenId)

  // nft.loading is true during load.
  if (loading) return <>Loading…</>

  // nft.error is an Error instance in case of error.
  if (error || !nft) return <>Error.</>

  // You can now display the NFT metadata.
  return (
    <Box m="5">
      <h1>{nft.name}</h1>
      <img src={nft.image} alt="" />
    </Box>
  )
}
