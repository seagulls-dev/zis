export interface IpState {
  isSaving: boolean
  isLoading: boolean
  ip?: IpDetails
  ips?: IpDetails[]
  error?: ErrorIp
}
export interface IpDetails {
  id: number
  address: string
  customer_id: number
  subnet_id: number
  ipv4: number
  ipv6?: number
  is_external: boolean
  comment?: string
  used?: Date
}
export interface CreateIpParams {
  customer_id: number
  subnet_id: number
  address: string
  comment?: string
}
export interface UpdateIpParams {
  id: number
  customer_id?: number
  ipv6?: number
  comment?: string
}
export interface ErrorIp {
  message: string
}
