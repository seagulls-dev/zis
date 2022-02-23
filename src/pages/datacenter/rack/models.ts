import { DataCenterDetails } from '../datacenter/models'

export interface RackState {
  isSaving?: boolean
  isLoading?: boolean
  rack?: RackDetails
  racks?: RackDetails[]
  error?: RackError
}

export interface RackDetails extends RackParams {
  id: number
}

export interface RackParams {
  name: string
  datacenter_id: number
  u_count: number
  datacenter?: DataCenterDetails
  positions?: {
    comment: string
    id: number
    position: number
    type: string
  }[]
}

export interface RackError {
  message: string
}
