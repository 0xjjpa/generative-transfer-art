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
  const { account, library } = useEthers()
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
              address={'0x5d99371a4297dfd301a1f22eff22a7e0ed9b4482'}
              tokenId={tokenId}
            />
          ))}
        </Flex>
      </Box>
    </NftProvider>
  )
}

function Nft({ address, tokenId }: { address: string; tokenId: string }) {
  console.log('ADRESS', address, tokenId)
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
