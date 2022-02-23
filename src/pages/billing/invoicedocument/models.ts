import { InvoiceDetails } from '../invoice/models'

export interface InvoiceDocumentState {
  isLoading: boolean
  isSaving: boolean
  document?: InvoiceDocumentDetails
  error?: InvoiceDocumentError
  finalized?: InvoiceDetails
  baseContent?: string
}

export interface InvoiceDocumentDetails {
  id: number
  invoice_id: number
  content: string
  version: number
}
export interface CreateInvoiceDocumentParams {
  invoice_id: number
}
export interface FinalizeDocumentParams {
  id: number
}
export interface InvoiceDocumentError {
  message: string
}
