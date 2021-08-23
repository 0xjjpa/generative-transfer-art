import { Flex, Box, Tooltip } from '@chakra-ui/react'
import { useEffect } from 'react'
import { ActionType } from '../../lib/reducers'

export type NftPropsType = {
  og: boolean
  isWrapper: boolean
  darkChild: boolean
  nice: boolean
}

const NFT_PROPS_MAP = {
  og: {
    color: 'purple',
    description:
      'A real OG. One of the only 64 minted pieces in the whole collection.',
  },
  isWrapper: {
    color: 'pink',
    description:
      'Wrap it good. Inside the wrapper contract, granted a magical pink pixel.',
  },
  darkChild: {
    color: 'black',
    description:
      'Dark child. You were minted too early my son. TokenID <64 yet a copy.',
  },
  nice: {
    color: 'red',
    description: 'Nice.',
  },
}

export const NFTProps = ({
  tokenId,
  nftProps,
  dispatch,
}: {
  tokenId: string,
  nftProps: NftPropsType
  dispatch: React.Dispatch<ActionType>
}) => {
  useEffect(() => {
    dispatch({
      type: 'SET_PROPS_PER_TOKEN_ID',
      tokenId: tokenId,
      nftProps,
    })
  }, [])
  return (
    <Flex position="absolute" left="0" top="0" m="-2">
      {Object.keys(nftProps).map(
        (prop) =>
          nftProps[prop] && (
            <Tooltip key={prop} label={NFT_PROPS_MAP[prop].description} fontSize="md">
              <Box
                bg={NFT_PROPS_MAP[prop].color}
                borderRadius="50%"
                height="10px"
                width="10px"
                mr="2"
              ></Box>
            </Tooltip>
          )
      )}
    </Flex>
  )
}
