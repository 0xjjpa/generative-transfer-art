import { Flex, Box, Tooltip } from '@chakra-ui/react'

type nftPropsType = {
  og: boolean
  isWrapper: boolean
}

const NFT_PROPS_MAP = {
  og: {
    color: 'purple',
    description: 'A real OG. One of the only 64 minted pieces in the whole collection.',
  },
  isWrapper: {
    color: 'pink',
    description: 'Wrap it good. Inside the wrapper contract, granted a magical pink pixel.',
  },
}

export const NFTProps = ({ nftProps }: { nftProps: nftPropsType }) => {
  return (
    <Flex position="absolute" left="0" top="0" m="-2">
      {Object.keys(nftProps).map(
        (prop) =>
          nftProps[prop] && (
            <Tooltip label={NFT_PROPS_MAP[prop].description} fontSize="md">
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
