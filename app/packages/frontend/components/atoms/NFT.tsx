import { Box, Text, Image, Skeleton, Flex } from '@chakra-ui/react'
import { useNft } from 'use-nft'

export const Nft = ({
  address,
  tokenId,
}: {
  address: string
  tokenId: string
}) => {
  const { loading, error, nft } = useNft(address, tokenId)

  // nft.loading is true during load.
  if (loading) return <Skeleton height="150px" />

  // nft.error is an Error instance in case of error.
  if (error || !nft) return <Skeleton height="150px" />

  // You can now display the NFT metadata.
  const realId = nft.name.split('#').pop()
  const og = realId == tokenId
  return (
    <Flex m="5" justifyContent="center" flexDirection="column" alignItems="center">
      <Flex justifyContent="center">
        <Text
          bgClip={og && 'text'}
          bgGradient={og && 'linear(to-l, #7928CA, #FF0080)'}
          fontSize="xl"
          as="h2"
          pb="5"
        >
          {og ? `Token #${realId}` : `Copy of ${realId}`}
        </Text>
      </Flex>
      <Box p="5" background="whiteAlpha.900" border="1px solid #ddd">
        <Image src={nft.image} alt={nft.name}  />
      </Box>
      <Text mt="2" fontSize="small">Token Id #{tokenId}</Text>
    </Flex>
  )
}
