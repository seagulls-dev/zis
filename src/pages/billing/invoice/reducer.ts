import {ActionType, InvoiceActions} from './actions'
import {AsyncActionMode} from 'common/models'
import {InvoiceState} from './models'

const INVOICE_INITIAL_STATE: InvoiceState = {
  isLoading: false,
  isSaving: false,
  invoice: {
    id: 0,
    customer_id: 0,
    number: 0,
    date_of_issue: '',
    date_of_maturity: '',
    date_of_taxing: '',
    currency: 'CZK',
    document_is_dirty: 0,
    invoiceItems: [],
  },
}

export default (
  state = INVOICE_INITIAL_STATE,
  action: InvoiceActions,
): InvoiceState => {
  switch (action.type) {
    case ActionType.GET_INVOICE:
      if (action.mode === AsyncActionMode.REQUEST) {
        return { ...state, isLoading: true }
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state,
          isLoading: false,
          invoice: action.data,
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
    case ActionType.GET_INVOICE_ITEMS:
      if (action.mode === AsyncActionMode.REQUEST) {
        return { ...state, isLoading: true }
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state,
          isLoading: false,
          invoice: {
            ...state.invoice,
            invoiceItems: action.data,
          },
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
    case ActionType.CREATE_INVOICE:
      if (action.mode === AsyncActionMode.REQUEST) {
        return { ...state, isSaving: true }
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state,
          invoices: state.invoices?.concat(action.data),
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
    case ActionType.CREATE_INVOICE_MAIL:
      if (action.mode === AsyncActionMode.REQUEST) {
        return {...state, isSaving: true}
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state, mail: action.data, isSaving: false
        }
      }
      if (action.mode === AsyncActionMode.ERROR) {
        return {...state, isSaving: false, error: action.error}
      }
      break
    case ActionType.GENERATE_INVOICE:
      if (action.mode === AsyncActionMode.REQUEST) {
        return {...state, isSaving: true}
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {...state, isSaving: false, invoice: action.data}
      }
      if (action.mode === AsyncActionMode.ERROR) {
        return {...state}
      }
      break
    case ActionType.CREATE_INVOICE_ITEM:
      if (action.mode === AsyncActionMode.REQUEST) {
        return { ...state, isSaving: true }
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state,
          invoices: state.invoices?.map((invoice) =>
            invoice.id === action.data.invoice_id
              ? invoice.invoiceItems === null ? {...invoice, invoiceItems: [action.data]} : {...invoice, invoiceItems: invoice.invoiceItems.concat(action.data)}
              : invoice,
          ),
          invoice: {
            ...state.invoice,
            invoiceItems: state.invoice.invoiceItems?.concat(action.data),
          },
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

    case ActionType.UPDATE_INVOICE:
      if (action.mode === AsyncActionMode.REQUEST) {
        return { ...state, isSaving: true }
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state,
          invoices: state.invoices
            ? state.invoices.map((invoice) =>
                invoice.id === action.data.id ? { ...action.data } : invoice,
              )
            : [{ ...action.data }],
          invoice: action.data,
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

    case ActionType.UPDATE_INVOICE_ITEM:
      if (action.mode === AsyncActionMode.REQUEST) {
        return { ...state, isSaving: true }
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state,
          invoices: state.invoices?.map((invoice) =>
            invoice.id === action.data.invoice_id
              ? {
                  ...invoice,
                  invoiceItems: invoice.invoiceItems?.map((item) =>
                    item.id === action.data.id ? { ...action.data } : item,
                  ),
                }
              : invoice,
          ),
          // invoice: {
          //   ...state.invoice,
          //   invoiceItems: state.invoice.invoiceItems?.map((item) =>
          //     item.id === action.data.id ? { ...action.data } : item,
          //   ),
          // },
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

    case ActionType.GET_INVOICES:
      if (action.mode === AsyncActionMode.REQUEST) {
        return { ...state, isLoading: true }
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state,
          isLoading: false,
          invoices: action.data,
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
    case ActionType.DELETE_INVOICE:
      if (action.mode === AsyncActionMode.REQUEST) {
        return { ...state, isSaving: true }
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state,
          invoices: state.invoices!.filter(
            (invoice) => invoice.id !== action.request.id,
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

    case ActionType.DELETE_INVOICE_ITEM:
      if (action.mode === AsyncActionMode.REQUEST) {
        return { ...state, isSaving: true }
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state,
          invoices: state.invoices!.map((invoice) =>
            invoice.id === action.data.invoice_id
              ? {
                  ...invoice,
                  invoiceItems: invoice.invoiceItems.filter(
                    (item) => item.id !== action.request.item_id,
                  ),
                }
              : invoice,
          ),
          // invoice: {
          //   ...state.invoice,
          //   invoiceItems: state.invoice.invoiceItems.filter(
          //     (item) => item.id !== action.request.item_id,
          //   ),
          // },
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
