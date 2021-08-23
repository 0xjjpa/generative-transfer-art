import { createContext, useReducer } from 'react'
import {
  StateType,
  reducer,
  initialState,
  ActionType,
} from '../reducers/FilterReducer'

interface FilterContextProps {
  state: StateType
  dispatch: ({ type, prop }: ActionType) => void
}

export const FilterContext = createContext({} as FilterContextProps)

export const FilterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const value = { state, dispatch }
  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  )
}
