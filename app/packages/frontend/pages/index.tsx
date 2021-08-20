import {
  Box,
  Button,
  Divider,
  Heading,
  Text,
  SimpleGrid,
} from '@chakra-ui/react'
import { ChainId, useEthers, useSendTransaction } from '@usedapp/core'
import { providers, utils } from 'ethers'
import React, { useReducer } from 'react'
import { TransferArt as TRANSFER_ART_CONTRACT_ADDRESS } from '../artifacts/contracts/contractAddress'
import { TAList } from '../components/molecules/TAList'
import { TACollection } from '../components/molecules/TACollection'
import Layout from '../components/layout/Layout'
import { fetchBalance, initialState, reducer } from '../lib/reducers'

/**
 * Constants & Helpers
 */

const localProvider = new providers.StaticJsonRpcProvider(
  'http://localhost:8545'
)

function HomeIndex(): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { account, chainId, library } = useEthers()

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

  return (
    <Layout>
      <Heading as="h1" mb="8">
        Generative Transfer Art Project 1
      </Heading>
      <SimpleGrid columns={[1, 1, 2, 2]} spacing={10}>
        <Box p="8" mt="8" bg="gray.100">
          <Text fontSize="xl">Contract Address:</Text>
          <Text fontSize="xl" fontFamily="mono">
            {TRANSFER_ART_CONTRACT_ADDRESS}
          </Text>
          <Divider my="8" borderColor="gray.400" />
          <Box>
            {!account ? (
              <Text>Please connect your wallet to see your tokens.</Text>
            ) : (
              <TAList
                balance={state.balance}
                tokenIds={state.tokenIds}
                loadBalance={() =>
                  fetchBalance({
                    provider: library,
                    address: account,
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
        </Box>
        <Box p="8" mt="8" bg="gray.100">
          <TACollection />
        </Box>
      </SimpleGrid>
    </Layout>
  )
}

export default HomeIndex
