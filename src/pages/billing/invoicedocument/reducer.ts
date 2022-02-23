import {ActionType, InvoiceDocumentActions} from './actions'
import {AsyncActionMode} from 'common/models'
import {InvoiceDocumentState} from './models'

const INVOICEDOCUMENT_INITIAL_STATE: InvoiceDocumentState = {
  isLoading: false,
  isSaving: false,
  error: undefined,
}

export default (
  state = INVOICEDOCUMENT_INITIAL_STATE,
  action: InvoiceDocumentActions,
): InvoiceDocumentState => {
  switch (action.type) {
    case ActionType.GET_INVOICEDOCUMENT:
      if (action.mode === AsyncActionMode.REQUEST) {
        return { ...state, isLoading: true }
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state,
          isLoading: false,
          document: action.data,
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
    case ActionType.GET_DOCUMENTCONTENT_BY_ID:
      if (action.mode === AsyncActionMode.REQUEST) {
        return {...state, isLoading: true}
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {...state, baseContent: action.data}
      }
      if (action.mode === AsyncActionMode.ERROR) {
        return {...state, isLoading: false, error: action.error}
      }
      break
    case ActionType.GET_ATTACHMENTCONTENT_BY_ID:
      if (action.mode === AsyncActionMode.REQUEST) {
        return {...state, isLoading: true}
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {...state, baseContent: action.data}
      }
      if (action.mode === AsyncActionMode.ERROR) {
        return {...state, isLoading: false, error: action.error}
      }
      break
    case ActionType.CREATE_INVOICEDOCUMENT:
      if (action.mode === AsyncActionMode.REQUEST) {
        return { ...state, isSaving: true }
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state,
          document: action.data,
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
    case ActionType.FINALIZE_DOCUMENT:
      if (action.mode === AsyncActionMode.REQUEST) {
        return {...state, isSaving: true}
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {...state, isSaving: false, finalized: action.data}
      }
      if (action.mode === AsyncActionMode.ERROR) {
        return {...state, isSaving: false, error: action.error}
      }
      break
    case ActionType.GET_INVOICEDOCUMENT_BY_INVOICE:
      if (action.mode === AsyncActionMode.REQUEST) {
        return { ...state, isLoading: true }
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state,
          isLoading: false,
          document: action.data,
        }
      }
      if (action.mode === AsyncActionMode.ERROR) {
        return {
          ...state,
          isLoading: false,
          document: undefined,
          error: action.error,
        }
      }
      break
    case ActionType.DELETE_INVOICEDOCUMENT:
      if (action.mode === AsyncActionMode.REQUEST) {
        return { ...state, isSaving: true }
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state,
          document: action.data,
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
