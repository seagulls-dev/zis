import { InvoiceAttachmentDetails } from 'components/Invoice/InvoiceAttachment/models'
import { Moment } from 'moment'
import { InvoiceDocumentDetails } from '../invoicedocument/models'

export interface InvoiceState {
  isLoading?: boolean
  isSaving?: boolean
  invoices?: InvoiceDetails[]
  invoice: InvoiceDetails
  error?: InvoiceError
  mail?: InvoiceMailDetail
}
export interface InvoiceDetails extends CreateInvoiceParams {
  id: number
  document_is_dirty?: number
  exchange_rate?: number
  exchange_rate_amount?: number
  attachments?: InvoiceAttachmentDetails[]
  state?: number
}
export interface CreateInvoiceParams extends UpdateInvoiceParams {
  customer_id: number
  number?: number
}
export interface UpdateInvoiceParams {
  date_of_issue: string
  date_of_maturity: string
  date_of_taxing: string
  date_of_payment?: string
  date_of_sent?: string
  currency: 'CZK' | 'USD' | 'EUR'
  period_from?: string
  period_to?: string
  items_text_prefix?: string
  items_text_sufix?: string
  internal_note?: string
  generate_customer_services?: 0 | 1
  invoiceItems: InvoiceItemDetails[]
  total_without_vat?: number
  total_with_vat?: number
  total_vat?: number
  range?: [Moment, Moment]
  documents?: InvoiceDocumentDetails[]
  customer_name?: string
  sent?: boolean
}

export interface InvoiceError {
  message: string
}

export interface InvoiceItemDetails extends CreateInvoiceItemParams {
  id: number
}

export interface CreateInvoiceItemParams extends UpdateInvoiceItemParams {
  invoice_id: number
}

export interface UpdateInvoiceItemParams {
  name: string
  unit_count?: number
  unit?: string
  price_per_unit: number
  tax_rate?: number
  tax_id: number
  period_from?: string
  period_to?: string
  position?: number
  total_without_vat?: number
  total_with_vat?: number
  total_vat?: number
  customer_service_id?: number
}
export interface InvoiceItemError {
  message: string
}
export interface GenerateInvoiceParams {
  id: number
  invoice_detail: number
}

export interface CreateInvoiceMailParams {
  id: number
}

export interface SendInvoiceMailParams {
  mail_id: number
  subject: string
  body: string
  emails: string[]
}

export interface InvoiceMailDetail {
  id: number
  state?: number
  customer_id: number
  subject: string
  body: string
  emails?: string[]
}
export interface InvoiceSentMailDetail {
  id: number
  mail_id: number
  mail_to: string
  name: string
  created_at?: number
}
