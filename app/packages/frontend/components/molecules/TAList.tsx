import { TransferArt as TRANSFER_ART_CONTRACT_ADDRESS } from '../../artifacts/contracts/contractAddress'
import { useContext, useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { NftProvider } from 'use-nft'
import { useEthers } from '@usedapp/core'
import { Box, Text, SimpleGrid, Divider } from '@chakra-ui/layout'
import { Nft } from '../atoms/NFT'
import { TAContainer } from '../atoms/TAContainer'
import { TANavigator } from '../atoms/TANavigator'
import { FilterContext } from '../../contexts/FilterContext'
import { NftPropsType } from '../atoms/NFTProps'
import { ActionType } from '../../lib/reducers'

export const TAList = ({
  address,
  balance,
  tokenIds,
  loadBalance,
  nftProps,
  dispatch,
}: {
  address: string
  balance: string
  tokenIds: string[]
  loadBalance: () => void
  nftProps: { [tokenId: string]: NftPropsType }
  dispatch: React.Dispatch<ActionType>
}) => {
  const [page, setPage] = useState(0)
  const { state } = useContext(FilterContext)
  const { library } = useEthers()
  const itemsPerPage = 6
  // const currentTokenIds = tokenIds.filter(
  //   (_, index) =>
  //     index < itemsPerPage * (page + 1) && index >= page * itemsPerPage
  // )

  useEffect(() => {
    loadBalance()
  }, [address])

  return (
    <NftProvider fetcher={['ethers', { ethers, provider: library }]}>
      <Box>
        <Text fontSize="lg" my="5">
          Owned {balance}
        </Text>
        <SimpleGrid columns={[1, 2, 2, 3]} spacing={10}>
          {tokenIds.map((tokenId) => {
            const isSelected = Object.keys(state).reduce(
              (acc, val) =>
                acc && nftProps && nftProps[tokenId] && nftProps[tokenId][val],
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
        {tokenIds.length > itemsPerPage && (
          <TANavigator page={page} setPage={setPage} />
        )}
      </Box>
    </NftProvider>
  )
}
