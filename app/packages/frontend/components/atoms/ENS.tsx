import { Text, TextProps } from '@chakra-ui/react'
import { useEthers } from '@usedapp/core'
import { useEffect, useState } from 'react'
import { getCurrentProvider } from '../../lib/connectors'
import { truncate } from '../../lib/utils'

export const ENS = ({ address, props }: { address: string, props?: TextProps }): JSX.Element => {
  const { library } = useEthers()
  const provider = getCurrentProvider(library)
  const [ens, setEns] = useState<string | null>()

  useEffect(() => {
    let mounted = true
    if (address && provider) {
      provider
        ?.lookupAddress(address)
        .then((name) => {
          if (mounted) {
            setEns(name)
          }
        })
        .catch(() => setEns(null))
    }
    return () => {
      mounted = false
      setEns(null)
    }
  }, [address, provider])

  return <Text fontFamily="mono" {...props}>{ens || truncate(address)}</Text>
}