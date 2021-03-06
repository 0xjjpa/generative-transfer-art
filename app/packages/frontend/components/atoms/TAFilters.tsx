import { Tag } from '@chakra-ui/react'
import { useContext } from 'react'
import { FilterContext } from '../../contexts/FilterContext'

const Filter = ({ filter }: { filter: string }) => {
  const { state, dispatch } = useContext(FilterContext)
  return (
    <Tag
      colorScheme={state[filter] ? 'green' : 'gray'}
      mr="5"
      onClick={() => {
        dispatch({
          type: 'SET_FILTER',
          prop: filter,
        })
      }}
    >
      {filter.toUpperCase()}
    </Tag>
  )
}

export const TAFilters = () => {
  const filters = ['og']
  return (
    <>
      {filters.map((filter) => (
        <Filter key={filter} filter={filter} />
      ))}
    </>
  )
}
