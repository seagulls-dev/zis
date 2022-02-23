export interface IpSubnetState {
  isSaving: boolean
  isLoading: boolean
  ipSubnet?: IpSubnetDetails
  ipSubnets?: IpSubnetDetails[]
  error?: ErrorSubnetIp
}
export interface IpSubnetDetails {
  id: number
  customer_id: number
  cidr: string
  gateway?: string
  ipmi?: 1 | 0
  vlan?: number
  location?: string
  dns_id?: number
}
export interface CreateSubnetIpParams {
  customer_id: number
  cidr: string
  gateway?: string
  ipmi?: 1 | 0
  vlan?: number
  location?: string
  dns_id?: number
}
export interface UpdateSubnetIpParams {
  id: number
  customer_id?: number
  ipmi?: 1 | 0
  vlan?: number
  location?: string
  dns_id?: number
}
export interface ErrorSubnetIp {
  message: string
}
