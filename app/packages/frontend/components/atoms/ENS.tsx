import { Text, TextProps } from '@chakra-ui/react'
import { useEthers } from '@usedapp/core'
import { useEffect, useState } from 'react'
import { truncate } from '../../lib/utils'

export const ENS = ({ address, props }: { address: string, props?: TextProps }): JSX.Element => {
  const { library } = useEthers()
  const [ens, setEns] = useState<string | null>()

  useEffect(() => {
    let mounted = true
    if (address && library) {
      library
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
  }, [address, library])

  return <Text fontFamily="mono" {...props}>{ens || truncate(address)}</Text>
}