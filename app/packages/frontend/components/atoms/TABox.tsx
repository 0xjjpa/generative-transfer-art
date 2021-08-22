import { Box, useColorMode } from '@chakra-ui/react'
export const TABox = ({ children }) => {
  const { colorMode } = useColorMode()
  const bgColor = { light: 'gray.100', dark: 'gray.600' }
  return (
    <Box p="8" mt="8" bg={bgColor[colorMode]}>
      {children}
    </Box>
  )
}
