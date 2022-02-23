import { ActionType, CountriesActions } from './actions'
import { AsyncActionMode } from 'common/models'
import { CountriesState } from './models'

const COUTRIES_INITIAL_STATE: CountriesState = {
  isLoading: false,
  error: undefined,
}

export default (
  state = COUTRIES_INITIAL_STATE,
  action: CountriesActions,
): CountriesState => {
  switch (action.type) {
    case ActionType.GET_COUNTRIES:
      if (action.mode === AsyncActionMode.REQUEST) {
        return { ...state, isLoading: true }
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state,
          isLoading: false,
          countries: action.data,
        }
      }
      if (action.mode === AsyncActionMode.ERROR) {
        return {
          ...state,
          isLoading: false,
          error: action.error,
        }
      }
      break
  }
  return state
}
