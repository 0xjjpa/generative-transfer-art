import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Heading, Text } from '@chakra-ui/layout'
import {
  SimpleGrid,
  Code,
  Box,
  Link,
  List,
  ListItem,
  Tag,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import Layout from '../components/layout/Layout'

function P1(): JSX.Element {
  return (
    <Layout>
      <Heading as="h1" mb="8">
        Generative Transfer Art
      </Heading>
      <SimpleGrid columns={2}>
        <Box>
          <Text>
            Generative Transfer Art (GTA) is a multi-series of online NFT
            experiments based on art generation via on-chain behaviour, using
            smart contracts alone.
          </Text>
          <Text mt="5">
            Unlike other NFT art generation projects, GTA produces the contents
            (<Code>tokenURI</Code>) of the visuals via <b>SVG encoding</b>.
            Additionally, GTA art is up to the user to create, as only after the
            original NFT has been transfered to another wallet, it’s final
            display can be seen.
          </Text>
          <Text mt="5">
            GTAP currently has two series, GTAP-1 and GTAP-2. For the latest
            status, please go to the{' '}
            <Link
              href="https://generative-transfer-art.vercel.app/"
              isExternal
              color="pink.400"
            >
              GTAP website
            </Link>
            , and visit the latest mints on our gallery.
          </Text>
          <List mt="5">
            <ListItem>
              Project 1 - GTAP-1 <Tag>Minting completed</Tag>{' '}
              <NextLink href="/p1" passHref>
                <Link px="4" py="1">
                  See Gallery.
                </Link>
              </NextLink>
            </ListItem>
            <ListItem mt="2">
              Project 2 - Animal Coloring Book <Tag colorScheme="green">Ongoing</Tag>{' '}
              <Link
                px="4"
                py="1"
                href="https://generative-transfer-art.vercel.app/"
                isExternal
              >
                Go mint. <ExternalLinkIcon boxSize="3" />
              </Link>
            </ListItem>
          </List>
        </Box>
      </SimpleGrid>
    </Layout>
  )
}

export default P1
