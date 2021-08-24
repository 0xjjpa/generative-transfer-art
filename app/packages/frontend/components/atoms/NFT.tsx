import {
  Box,
  Text,
  Image,
  Skeleton,
  Flex,
  Link,
  useColorMode,
} from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { TransferArt as TRANSFER_ART_CONTRACT_ADDRESS } from '../../artifacts/contracts/contractAddress'
import TransferArt from '../../artifacts/contracts/TransferArt.sol/TransferArt.json'
import { useNft } from 'use-nft'
import { ENS } from './ENS'
import { useOwner } from '../../lib/hooks'
import { DEFAULT_CHAIN_ID, MINTED_COPIES_BEFORE_FINAL_COLLECTION, MINTING_COLLECTION_SIZE, WRAPPED_TOKEN_CONTRACT } from '../../lib/constants'
import { getExplorerAddressLink, useEthers } from '@usedapp/core'
import { useEffect, useState } from 'react'
import { TransferArt as TransferArtType } from '../../types/typechain'
import { getCurrentProvider } from '../../lib/connectors'
import { Contract } from 'ethers'
import { NFTProps, NftPropsType } from './NFTProps'
import { ActionType } from '../../lib/reducers'

export const Nft = ({
  address,
  tokenId,
  dispatch,
}: {
  address: string
  tokenId: string
  dispatch: React.Dispatch<ActionType>
}) => {
  const { library } = useEthers()
  const { loading, error, nft } = useNft(address, tokenId)
  const { colorMode } = useColorMode()
  const [realOwner, setRealOwner] = useState('')
  const [isWrapper, setIsWrapper] = useState(false)
  const provider = getCurrentProvider(library)
  const bgColor = { light: 'gray.50', dark: 'gray.600' }
  const owner = useOwner(tokenId)

  useEffect(() => {
    const loadRealOwner = async () => {
      const realOwner =
        owner == WRAPPED_TOKEN_CONTRACT
          ? await ((contract) => contract.ownerOf(tokenId))(
              new Contract(
                WRAPPED_TOKEN_CONTRACT,
                TransferArt.abi,
                provider
              ) as TransferArtType
            )
          : owner
      setRealOwner(realOwner)
      setIsWrapper(realOwner != owner)
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
  const darkChild = +tokenId < (MINTING_COLLECTION_SIZE + MINTED_COPIES_BEFORE_FINAL_COLLECTION) && !og;
  const nice = +tokenId == 69
  const nftProps: NftPropsType = { og, isWrapper, darkChild, nice }

  return (
    <Flex
      m="5"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
      position="relative"
    >
      <NFTProps tokenId={tokenId} nftProps={nftProps} dispatch={dispatch} />
      <Flex justifyContent="center">
        <Text
          bgClip={og && 'text'}
          bgGradient={og && 'linear(to-l, #7928CA, #FF0080)'}
          fontSize="xl"
          as="h2"
          py="3"
        >
          {og ? `Token #${realId}` : `Copy of ${realId}`}
        </Text>
      </Flex>

      <Box p="5" bg={bgColor[colorMode]} border="1px solid #ddd">
        <Image src={nft.image} alt={nft.name} />
      </Box>
      <Link
        href={`https://opensea.io/assets/${TRANSFER_ART_CONTRACT_ADDRESS}/${tokenId}`}
        display="flex"
        alignItems="center"
        mt="2"
        isExternal
      >
        <Text fontSize="small">
          Token Id #{tokenId}
        </Text>
        <ExternalLinkIcon pt="1"/>
      </Link>
      <Link href={getExplorerAddressLink(realOwner, DEFAULT_CHAIN_ID)} isExternal>
        <ENS props={{ fontSize: 'xs' }} address={realOwner} />
      </Link>
    </Flex>
  )
}
