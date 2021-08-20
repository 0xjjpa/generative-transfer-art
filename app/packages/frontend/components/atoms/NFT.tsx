import { Box, Text, Image, Skeleton } from '@chakra-ui/react'
import { useNft } from "use-nft"

export const Nft = ({ address, tokenId }: { address: string; tokenId: string }) => {
    const { loading, error, nft } = useNft(address, tokenId)
  
    // nft.loading is true during load.
    if (loading) return <Skeleton height="150px" />
  
    // nft.error is an Error instance in case of error.
    if (error || !nft) return <>Error.</>
  
    // You can now display the NFT metadata.
    return (
      <Box m="5">
        <Text fontSize="xl" as="h2">{nft.name.split('-').pop()}</Text>
        <Text fontSize="sm" as="h3">Token ID: {tokenId}</Text>
        <Image src={nft.image} alt={nft.name} p="5" />
      </Box>
    )
  }
  