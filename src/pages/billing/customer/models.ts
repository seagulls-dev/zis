import { CompanyDetails } from 'pages/company/models'

export interface CustomerState {
  isLoading: boolean
  isSaving: boolean
  customer?: CustomerDetails
  customers?: CustomerDetails[]
  error?: {}
  self_customer?: CustomerDetails
}

export interface CustomerDetails {
  id: number
  company_id: number
  owner_id?: number
  administrative_id?: number
  technical_id?: number
  billing_period?: 'month' | 'quarter_year' | 'half_year' | 'year'
  billing_currency: 'CZK' | 'USD' | 'EUR'
  language?: 'cs' | 'en' | 'sk'
  created_at?: Date
  updated_at?: Date
  deleted_at?: Date
  company?: CompanyDetails
  nextInvoice?: {
    period_from: Date
    period_to: Date
  }
  ident?: string
  invoice_detail?: number
}

export interface CustomerParams {
  id: number
  company_id: number
  owner_id?: number
  administrative_id?: number
  technical_id?: number
  billing_period?: 'month' | 'quarter_year' | 'half_year' | 'year'
  billing_currency?: 'CZK' | 'USD' | 'EUR'
  language?: 'cs' | 'en' | 'sk'
  username: string
  email: string
  name: string
  surname: string
  is_unix: boolean | number
}

export interface CreateCustomerState {}
