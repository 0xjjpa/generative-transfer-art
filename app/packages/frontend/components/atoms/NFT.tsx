import { Box, Text, Image, Skeleton, Tag, Flex } from '@chakra-ui/react'
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
  if (error || !nft) return <>Error.</>

  // You can now display the NFT metadata.
  const realId = nft.name.split('#').pop()
  const og = realId == tokenId
  return (
    <Box m="5">
      <Flex>
        <Text
          bgClip={og && "text"}
          bgGradient={og && 'linear(to-l, #7928CA, #FF0080)'}
          fontSize="xl"
          as="h2"
        >
          {nft.name.split('-').pop()}
        </Text>
      </Flex>
      <Text fontSize="sm" as="h3">
        Token ID: {tokenId}
      </Text>
      <Image src={nft.image} alt={nft.name} p="5" />
      {og ? (
        <Tag size="sm" colorScheme="green">
          OG
        </Tag>
      ) : (
        <Tag size="sm" colorScheme="red">
          Copy
        </Tag>
      )}
    </Box>
  )
}
