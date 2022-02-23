import { ActionType, InvoiceAttachmentActions } from './actions'
import { AsyncActionMode } from 'common/models'
import { InvoiceAttachmentState } from './models'

const INVOICEATTACHMENT_INITIAL_STATE: InvoiceAttachmentState = {
  // isLoading: false,
  isSaving: false,
  error: undefined,
}

export default (
  state = INVOICEATTACHMENT_INITIAL_STATE,
  action: InvoiceAttachmentActions,
): InvoiceAttachmentState => {
  switch (action.type) {
    case ActionType.GET_INVOICEATTACHMENT:
      if (action.mode === AsyncActionMode.REQUEST) {
        return { ...state, isLoading: true }
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state,
          invoiceattachments:
            state.invoiceattachments && state.invoiceattachments.length
              ? state.invoiceattachments.concat(action.data)
              : [action.data],
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

    case ActionType.CREATE_INVOICEATTACHMENT:
      if (action.mode === AsyncActionMode.REQUEST) {
        return { ...state, isSaving: true }
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state,
          invoiceattachments: state.invoiceattachments?.concat(action.data),
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

    case ActionType.GET_INVOICEATTACHMENTS:
      if (action.mode === AsyncActionMode.REQUEST) {
        return { ...state, isLoading: true }
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state,
          isLoading: false,
          invoiceattachments: action.data,
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
    case ActionType.DELETE_INVOICEATTACHMENT:
      if (action.mode === AsyncActionMode.REQUEST) {
        return { ...state, isSaving: true }
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state,
          invoiceattachments: state.invoiceattachments!.filter(
            (invoiceattachment) => invoiceattachment.id !== action.request.id,
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
