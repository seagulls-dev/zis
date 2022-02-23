export interface ServiceTypeState {
  isSaving: boolean
  isLoading?: boolean
  servicetype?: ServiceTypeDetails
  servicetypes?: ServiceTypeDetails[]
  error?: ServiceTypeError
}

export interface ServiceTypeDetails {
  id: number
  name: string
  is_dynamic: number
  service_link?: string
}

export interface CreateServiceTypeParams {
  name: string
  is_dynamic?: number | boolean
  service_link?: string
}

export interface UpdateServiceTypeParams {
  name: string
  is_dynamic?: number
  service_link?: string
}

export interface DeleteServiceTypeParams {
  id: number
}

export interface ServiceTypeError {
  message: string
}
