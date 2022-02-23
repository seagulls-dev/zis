import { CustomerDetails } from 'pages/billing/customer/models'

export interface CompanyState {
  isLoading: boolean
  isSaving?: boolean
  error?: ErrorCompany
  companies?: CompanyDetails[]
  company?: CompanyDetails
}

export interface CompanyDetails {
  id: number
  name: string
  customer?: CustomerDetails
  company_number: string
  vat_number: string
  street: string
  city: string
  zip: string
  region?: string
  country: string
  vat_payer: boolean | number
  file_number?: string
  email?: string
  phone?: string
  note?: string
  deleted_at?: Date
  created_at?: Date
  updated_at?: Date
}

export interface CompanyParams {
  name: string
  company_number: string
  vat_number: string
  street: string
  city: string
  zip: string
  region?: string
  country: string
  vat_payer: boolean | number
  file_number?: string
  email?: string
  phone?: string
  note?: string
  is_new_customer?: boolean | number
}

export interface UpdateCompanyParams {}

export interface ErrorCompany {
  message: string
}
