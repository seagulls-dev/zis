export interface DnsServiceState {
  isSaving?: boolean
  isLoading?: boolean
  dnsservice?: DnsServiceDetails
  dnsservices?: DnsServiceDetails[]
  error?: DnsServiceError
}

export interface DnsServiceDetails extends CreateDnsServiceParams {
  id: number
}

export interface CreateDnsServiceParams {
  server_id: number
  driver: 'PowerDnsService' | 'Amazon'
  protocol: 'http' | 'https'
  host: string
  port: number
  instance?: string //localhost
  username?: string
  password?: string
  base_url?: string //API path
  token_name?: string //API token
  token_value?: string //API token value
}

export interface UpdateDnsServiceParams {
  id: number
  protocol?: 'http' | 'https'
  host?: string
  port?: number
  instance?: string //localhost
  username?: string
  password?: string
  base_url?: string //API path
  token_name?: string //API token
  token_value?: string //API token value
}
export interface DeleteDnsServiceParams {
  id: number
}

export interface DnsServiceError {
  message: string
}
