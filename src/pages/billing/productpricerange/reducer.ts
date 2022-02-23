import { ActionType, ProductPriceRangeActions } from './actions'
import { AsyncActionMode } from 'common/models'
import { ProductPriceRangeState } from './models'

const PRODUCTPRICERANGE_INITIAL_STATE: ProductPriceRangeState = {
  isLoading: false,
  isSaving: false,
  error: undefined,
}

export default (
  state = PRODUCTPRICERANGE_INITIAL_STATE,
  action: ProductPriceRangeActions,
): ProductPriceRangeState => {
  switch (action.type) {
    case ActionType.GET_PRODUCTPRICERANGE:
      if (action.mode === AsyncActionMode.REQUEST) {
        return { ...state, isLoading: true }
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state,
          isLoading: false,
          productpricerange: action.data,
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
    case ActionType.CREATE_PRODUCTPRICERANGE:
      if (action.mode === AsyncActionMode.REQUEST) {
        return { ...state, isSaving: true }
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state,
          productpriceranges: state.productpriceranges?.concat(action.data),
          isSaving: false,
        }
      }
      if (action.mode === AsyncActionMode.ERROR) {
        return {
          ...state,
          isSaving: false,
          error: action.error,
        }
      }
      break
    case ActionType.GET_PRODUCTPRICERANGES:
      if (action.mode === AsyncActionMode.REQUEST) {
        return { ...state, isLoading: true }
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state,
          isLoading: false,
          productpriceranges: action.data,
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
    case ActionType.DELETE_PRODUCTPRICERANGE:
      if (action.mode === AsyncActionMode.REQUEST) {
        return { ...state, isSaving: true }
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state,
          productpriceranges: state.productpriceranges?.filter(
            (productpricerange) => productpricerange.id !== action.request.id,
          ),
          isSaving: false,
        }
      }
      if (action.mode === AsyncActionMode.ERROR) {
        return {
          ...state,
          isSaving: false,
          error: action.error,
        }
      }
      break

    case ActionType.UPDATE_PRODUCTPRICERANGE:
      if (action.mode === AsyncActionMode.REQUEST) {
        return { ...state, isSaving: true }
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state,
          productpriceranges: state.productpriceranges!.map(
            (productpricerange) =>
              productpricerange.id === action.data.id
                ? { ...action.data }
                : productpricerange,
          ),
          isSaving: false,
        }
      }
      if (action.mode === AsyncActionMode.ERROR) {
        return {
          ...state,
          isSaving: false,
          error: action.error,
        }
      }
      break
  }
  return state
}
