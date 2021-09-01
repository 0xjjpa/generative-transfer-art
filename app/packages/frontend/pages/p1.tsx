import {
  Box,
  Button,
  Divider,
  Heading,
  Text,
  SimpleGrid,
  Input,
  InputGroup,
  InputRightElement,
  useColorMode,
} from '@chakra-ui/react'
import { ChainId, useEthers, useSendTransaction } from '@usedapp/core'
import { providers, utils } from 'ethers'
import React, { useReducer, useState } from 'react'
import { TransferArt as TRANSFER_ART_CONTRACT_ADDRESS } from '../artifacts/contracts/contractAddress'
import { TAList } from '../components/molecules/TAList'
import { TACollection } from '../components/molecules/TACollection'
import Layout from '../components/layout/Layout'
import { fetchBalance, initialState, reducer } from '../lib/reducers'
import { useEffect } from 'react'
import { getCurrentProvider } from '../lib/connectors'
import { DarkModeSwitch } from '../components/atoms/DarkModeSwitch'
import { TABox } from '../components/atoms/TABox'
import { TAFilters } from '../components/atoms/TAFilters'
import { FilterProvider } from '../contexts/FilterContext'

/**
 * Constants & Helpers
 */

const localProvider = new providers.StaticJsonRpcProvider(
  'http://localhost:8545'
)

function HomeIndex(): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [currentAddress, setCurrentAddress] = useState<string>('')
  const { account, chainId, library } = useEthers()
  const { colorMode } = useColorMode()
  const bgColor = { light: 'whiteAlpha.900', dark: 'blackAlpha.600' }

  const isLocalChain =
    chainId === ChainId.Localhost || chainId === ChainId.Hardhat

  // Use the localProvider as the signer to send ETH to our wallet
  const { sendTransaction } = useSendTransaction({
    signer: localProvider.getSigner(),
  })

  function sendFunds(): void {
    sendTransaction({
      to: account,
      value: utils.parseEther('0.1'),
    })
  }

  useEffect(() => {
    if (utils.isAddress(state.address)) {
      const currentAddress = utils.getAddress(state.address)
      setCurrentAddress(currentAddress)
    }
    return () => setCurrentAddress('')
  }, [state.address])

  const addressToLoad = currentAddress ? currentAddress : account

  return (
    <Layout>
      <FilterProvider>
        <Heading as="h1" mb="8">
          Generative Transfer Art Project 1
        </Heading>
        <TAFilters />
        <SimpleGrid columns={[1, 1, 2, 2]} spacing={10}>
          <TABox>
            <Text fontSize="xl">Contract Address:</Text>
            <Text fontSize="xl" fontFamily="mono">
              {TRANSFER_ART_CONTRACT_ADDRESS}
            </Text>
            <Divider my="8" borderColor="gray.400" />
            <Box my="5">
              <Text mb="2">
                Look up someone’s collection, either by pasting an address or
                clicking them in the gallery.
              </Text>
              <InputGroup>
                <Input
                  bg={bgColor[colorMode]}
                  type="text"
                  placeholder="0x1234..."
                  onChange={(e) => {
                    dispatch({
                      type: 'SET_ADDRESS_SEARCH',
                      address: e.target.value,
                    })
                  }}
                />
                {state.address != '' && (
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={() => {
                        dispatch({
                          type: 'SET_ADDRESS_SEARCH',
                          address: '',
                        })
                      }}
                    >
                      Reset
                    </Button>
                  </InputRightElement>
                )}
              </InputGroup>
            </Box>
            <Box>
              {!addressToLoad ? (
                <Text>Please connect your wallet to see your tokens.</Text>
              ) : (
                <TAList
                  dispatch={dispatch}
                  nftProps={state.nftProps}
                  address={addressToLoad}
                  balance={state.balance}
                  tokenIds={state.tokenIds}
                  loadBalance={() =>
                    fetchBalance({
                      provider: getCurrentProvider(library),
                      address: addressToLoad,
                      dispatch,
                    })
                  }
                />
              )}
            </Box>
            {chainId == 1337 ||
              (chainId == 31337 && (
                <>
                  <Divider my="8" borderColor="gray.400" />
                  <Text mb="4">This button only works on a Local Chain.</Text>
                  <Button
                    colorScheme="teal"
                    onClick={sendFunds}
                    isDisabled={!isLocalChain}
                  >
                    Send Funds From Local Hardhat Chain
                  </Button>
                </>
              ))}
          </TABox>
          <TABox>
            <TACollection dispatch={dispatch} nftProps={state.nftProps} />
          </TABox>
        </SimpleGrid>
        <DarkModeSwitch />
      </FilterProvider>
    </Layout>
  )
}

export default HomeIndex
