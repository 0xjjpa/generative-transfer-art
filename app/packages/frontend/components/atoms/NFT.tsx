import {
  Box,
  Text,
  Image,
  Skeleton,
  Flex,
  Link,
  useColorMode,
} from '@chakra-ui/react'
import TransferArt from '../../artifacts/contracts/TransferArt.sol/TransferArt.json'
import { useNft } from 'use-nft'
import { ENS } from './ENS'
import { useOwner } from '../../lib/hooks'
import { DEFAULT_CHAIN_ID, WRAPPED_TOKEN_CONTRACT } from '../../lib/constants'
import { getExplorerAddressLink, useEthers } from '@usedapp/core'
import { useEffect, useState } from 'react'
import { TransferArt as TransferArtType } from '../../types/typechain'
import { getCurrentProvider } from '../../lib/connectors'
import { Contract } from 'ethers'

export const Nft = ({
  address,
  tokenId,
}: {
  address: string
  tokenId: string
}) => {
  const { library } = useEthers()
  const { loading, error, nft } = useNft(address, tokenId)
  const { colorMode } = useColorMode()
  const [realOwner, setRealOwner] = useState('')
  const provider = getCurrentProvider(library)
  const bgColor = { light: 'gray.50', dark: 'gray.600' }
  const owner = useOwner(tokenId)

  useEffect(() => {
    const loadRealOwner = async () => {
      const realOwner =
        owner == WRAPPED_TOKEN_CONTRACT
          ? await (contract => contract.ownerOf(tokenId))(
              new Contract(
                WRAPPED_TOKEN_CONTRACT,
                TransferArt.abi,
                provider
              ) as TransferArtType
            )
          : owner
      setRealOwner(realOwner)
    }
    loadRealOwner()
  }, [owner])

  // nft.loading is true during load.
  if (loading) return <Skeleton height="150px" />

  // nft.error is an Error instance in case of error.
  if (error || !nft) return <Skeleton height="150px" />

  // You can now display the NFT metadata.
  const realId = nft.name.split('#').pop()
  const og = realId == tokenId
  return (
    <Flex
      m="5"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
    >
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

      <Box p="5" bg={bgColor[colorMode]} border="1px solid #ddd">
        <Image src={nft.image} alt={nft.name} />
      </Box>
      <Text mt="2" fontSize="small">
        Token Id #{tokenId}
      </Text>
      <Link href={getExplorerAddressLink(owner, DEFAULT_CHAIN_ID)} isExternal>
        <ENS props={{ fontSize: 'xs' }} address={realOwner} />
      </Link>
    </Flex>
  )
}
