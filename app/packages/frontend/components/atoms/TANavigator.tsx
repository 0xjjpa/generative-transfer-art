import { Flex, Text } from '@chakra-ui/react'
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'
export const TANavigator = ({ page, setPage }) => {
  const nextPage = () => setPage(page + 1)
  const prevPage = () => setPage(page - 1)
  return (
    <Flex justifyContent="space-around">
      {page != 0 && (
        <Flex alignItems="center" cursor="pointer" onClick={prevPage}>
          <ArrowBackIcon mr="2" />
          <Text>Prev Page</Text>
        </Flex>
      )}
      <Flex alignItems="center" cursor="pointer" onClick={nextPage}>
        <Text>Next Page</Text>
        <ArrowForwardIcon ml="2" />
      </Flex>
    </Flex>
  )
}
