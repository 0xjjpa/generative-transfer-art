import { useEffect } from 'react'
import { ActionType } from '../../lib/reducers'

export const TAList = ({
  balance,
  loadBalance
}: {
  balance: string
  loadBalance: () => void
}) => {
  useEffect(() => {
      loadBalance()
  }, [])

  return <>Owned: {balance}</>
}
