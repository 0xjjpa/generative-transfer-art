import { useEthers } from '@usedapp/core'
import { DEFAULT_COLLECTION_SIZE } from '../../lib/constants'
import { TransferArt as TRANSFER_ART_CONTRACT_ADDRESS } from '../../artifacts/contracts/contractAddress'
import { useContext, useState } from 'react'
import { ethers } from 'ethers'
import { NftProvider } from 'use-nft'
import { Box } from '@chakra-ui/layout'
import { Nft } from '../atoms/NFT'
import { TANavigator } from '../atoms/TANavigator'
import { TAContainer } from '../atoms/TAContainer'
import { Divider, SimpleGrid } from '@chakra-ui/react'
import { getCurrentProvider } from '../../lib/connectors'
import { ActionType } from '../../lib/reducers'
import { useEffect } from 'react'
import { NftPropsType } from '../atoms/NFTProps'
import { FilterContext } from '../../contexts/FilterContext'

export const TACollection = ({
  dispatch,
  nftProps,
}: {
  nftProps: {[tokenId: string]: NftPropsType}
  dispatch: React.Dispatch<ActionType>
}) => {
  const [page, setPage] = useState(0)
  const { state } = useContext(FilterContext)
  const { library } = useEthers()
  const provider = getCurrentProvider(library)
  const tokenIds = [...Array(DEFAULT_COLLECTION_SIZE)].map(
    (_, tokenId) => `${page * DEFAULT_COLLECTION_SIZE + tokenId + 1}`
  )

  useEffect(() => {
    console.log('NFTPROPS', nftProps)
    console.log('STATE', state)
  }, [state])
  return (
    <NftProvider
      fetcher={['ethers', { ethers, provider: library || provider }]}
    >
      <Box>
        <TANavigator page={page} setPage={setPage} />
        <Divider m="5" />
        <SimpleGrid columns={[1, 2, 2, 3]} spacing={5}>
          {tokenIds.map((tokenId) => {
            const isSelected = Object.keys(state).reduce(
              (acc, val) => acc && nftProps && nftProps[tokenId] && nftProps[tokenId][val],
              true
            )
            return (
              <TAContainer isSelected={isSelected} key={tokenId}>
                <Nft
                  address={TRANSFER_ART_CONTRACT_ADDRESS}
                  tokenId={tokenId}
                  dispatch={dispatch}
                />
              </TAContainer>
            )
          })}
        </SimpleGrid>
        <Divider m="5" />
        <TANavigator page={page} setPage={setPage} />
      </Box>
    </NftProvider>
  )
}
