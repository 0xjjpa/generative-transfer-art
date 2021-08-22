import { Box, useColorMode } from '@chakra-ui/react'
export const TAContainer = ({ tokenId, children }) => {
  const { colorMode } = useColorMode()
  const bgColor = { light: 'blackAlpha.100', dark: 'blackAlpha.600' }
  return (
    <Box key={tokenId} bg={bgColor[colorMode]} borderRadius="5">
      {children}
    </Box>
  )
}
