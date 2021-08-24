import { Box, useColorMode } from '@chakra-ui/react'
export const TAContainer = ({ children, isSelected }) => {
  const { colorMode } = useColorMode()
  const bgColor = { light: 'blackAlpha.100', dark: 'blackAlpha.600' }
  return (
    <Box bg={bgColor[colorMode]} borderRadius="5" opacity={isSelected ? '1' : '0.2'}>
      {children}
    </Box>
  )
}
