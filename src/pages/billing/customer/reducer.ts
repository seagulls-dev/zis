import {ActionType, CustomerActions} from './actions'
import {AsyncActionMode} from 'common/models'
import {CustomerState} from './models'

const CUSTOMER_INITIAL_STATE: CustomerState = {
  isLoading: false,
  isSaving: false,
  error: undefined,
}

export default (
  state: CustomerState = CUSTOMER_INITIAL_STATE,
  action: CustomerActions,
): CustomerState => {
  switch (action.type) {
    case ActionType.GET_CUSTOMER:
      if (action.mode === AsyncActionMode.REQUEST) {
        return { ...state, isLoading: true }
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state,
          isLoading: false,
          customer: action.data,
        }
      }
      if (action.mode === AsyncActionMode.ERROR) {
        return {
          ...state,
          isLoading: false,
          error: action.error,
          customer: undefined
        }
      }
      break
    case ActionType.GET_CUSTOMER_SELF:
      if (action.mode === AsyncActionMode.REQUEST) {
        return {...state, isLoading: true}
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state,
          isLoading: false,
          self_customer: action.data,
          customer: action.data
        }
      }
      if (action.mode === AsyncActionMode.ERROR) {
        return {
          ...state,
          isLoading: false,
          error: action.error,
          self_customer: undefined,
          customer: undefined
        }
      }
      break
    case ActionType.GET_CUSTOMERS:
      if (action.mode === AsyncActionMode.REQUEST) {
        return { ...state, isLoading: true }
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state,
          isLoading: false,
          customers: action.data,
        }
      }
      if (action.mode === AsyncActionMode.ERROR) {
        return {
          ...state,
          isLoading: false,
          error: action.error,
          customers: undefined
        }
      }
      break
    case ActionType.CREATE_CUSTOMER:
      if (action.mode === AsyncActionMode.REQUEST) {
        return { ...state, isLoading: true }
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state,
          customers: state.customers?.concat(action.data),
          isLoading: false,
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
    case ActionType.DELETE_CUSTOMER:
      if (action.mode === AsyncActionMode.REQUEST) {
        return { ...state, isSaving: true }
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state,
          customers: state.customers!.filter(
            (customer) => customer.id !== action.request.id,
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
    case ActionType.UPDATE_CUSTOMER:
      if (action.mode === AsyncActionMode.REQUEST) {
        return { ...state, isSaving: true }
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state,
          isSaving: false,
          customers: state.customers!.map((customer) =>
            customer.id === action.data.id ? { ...action.data } : customer,
          ),
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
