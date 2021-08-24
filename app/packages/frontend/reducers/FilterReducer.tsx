export type StateType = {
  [filter: string]: boolean
}

export const initialState: StateType = {}

export type ActionType = {
  type: 'SET_FILTER'
  prop: string
}

export function reducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    case 'SET_FILTER':
      return {
        ...state,
        [action.prop]: !state[action.prop],
      }
    default:
      throw new Error('No valid filter reducer')
  }
}
