export interface InvoiceAttachmentState {
  isSaving?: boolean
  isLoading?: boolean
  invoiceattachment?: InvoiceAttachmentDetails
  invoiceattachments?: InvoiceAttachmentDetails[]
  error?: InvoiceAttachmentError
}

export interface InvoiceAttachmentDetails
  extends CreateInvoiceAttachmentParams {
  id: number
  mime_type: string
}

export interface CreateInvoiceAttachmentParams {
  invoice_id: number
  name: string
  content: string
}

export interface InvoiceAttachmentError {
  message: string
}
