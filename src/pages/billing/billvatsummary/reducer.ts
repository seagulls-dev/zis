import { ActionType, BillVatSummaryActions } from './actions'
import { AsyncActionMode } from 'common/models'
import { BillVatSummaryState } from './models'

const BILLVATSUMMARY_INITIAL_STATE: BillVatSummaryState = {
  isLoading: false,
  isSaving: false,
  error: undefined,
}

export default (
  state = BILLVATSUMMARY_INITIAL_STATE,
  action: BillVatSummaryActions,
): BillVatSummaryState => {
  switch (action.type) {
    case ActionType.GET_BILLVATSUMMARY:
      if (action.mode === AsyncActionMode.REQUEST) {
        return { ...state, isLoading: true }
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state,
          isLoading: false,
          billvatsummary: action.data,
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
    case ActionType.CREATE_BILLVATSUMMARY:
      if (action.mode === AsyncActionMode.REQUEST) {
        return { ...state, isSaving: true }
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state,
          billvatsummary: state.billvatsummary?.concat(action.data),
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
    case ActionType.DELETE_BILLVATSUMMARY:
      if (action.mode === AsyncActionMode.REQUEST) {
        return { ...state, isSaving: true }
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state,
          billvatsummary: state.billvatsummary!.filter(
            (tax) => tax.id !== action.request.id,
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

    case ActionType.UPDATE_BILLVATSUMMARY:
      if (action.mode === AsyncActionMode.REQUEST) {
        return { ...state, isSaving: true }
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state,
          billvatsummary: state.billvatsummary!.map((v) =>
            v.id === action.data.id ? { ...action.data } : v,
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
