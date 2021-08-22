import { Box, useColorMode } from '@chakra-ui/react'
export const TAContainer = ({ children }) => {
  const { colorMode } = useColorMode()
  const bgColor = { light: 'blackAlpha.100', dark: 'blackAlpha.600' }
  return (
    <Box bg={bgColor[colorMode]} borderRadius="5">
      {children}
    </Box>
  )
}
