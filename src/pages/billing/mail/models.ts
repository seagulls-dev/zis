import {InvoiceSentMailDetail} from '../invoice/models'

export interface MailState {
  isLoading?: boolean
  mails?: MailDetails[]
  error?: MailError
}

export interface MailDetails {
  id: number
  body: string
  customer_id: number
  emails?: string[]
  html?: number
  reference?: string
  state?: number
  subject: string
  created_at: number
  sent?: InvoiceSentMailDetail[]
}

export interface MailError {
  message: string
}
