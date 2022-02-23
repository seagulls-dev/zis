import { ActionType, CurrenciesActions } from './actions'
import { AsyncActionMode } from 'common/models'
import { CurrenciesState } from './models'

const COUTRIES_INITIAL_STATE: CurrenciesState = {
  isLoading: false,
  error: undefined,
}

export default (
  state = COUTRIES_INITIAL_STATE,
  action: CurrenciesActions,
): CurrenciesState => {
  switch (action.type) {
    case ActionType.GET_CURRENCIES:
      if (action.mode === AsyncActionMode.REQUEST) {
        return { ...state, isLoading: true }
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state,
          isLoading: false,
          currencies: action.data,
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
