export interface DataCenterState {
  isSaving?: boolean
  isLoading?: boolean
  datacenter?: DataCenterDetails
  datacenters?: DataCenterDetails[]
  error?: DataCenterError
}

export interface DataCenterDetails extends CreateDataCenterParams {
  id: number
}

export interface CreateDataCenterParams {
  name: string
  location_id: number
}

export interface UpdateDataCenterParams {
  id: number
  name: string
}

export interface DataCenterError {
  message: string
}
