export interface DnsZoneState {
  isSaving?: boolean
  isLoading?: boolean
  dnszone?: DnsZoneDetails
  dnszones?: DnsZone[]
  error?: DnsZoneError
}

export interface DnsZone {
  name: string
  id: string
}

export interface DnsZoneDetails {
  domain: string
  dnssec: boolean
  records: DnsRecordDetails[]
  archived?: DnsZoneDetails
}

export interface CreateDnsZoneParams {
  service_id: number
  domain: string //Domain
  ns1: string
  ns2: string
}

export interface DeleteDnsZoneParams {
  service_id: number
  domain: string
}

export interface GetZoneParams {
  service_id: number
  domain: string
}

export interface GetAllZonesParams {
  service_id: number
}

export interface ExportDnsZoneParams {
  service_id: number
  domain: string
}

export interface SetSoaTtlDnsZoneParams {
  service_id: number
  domain: string
  ttl: number //TTL
}

export interface SetDnsSecDnsZoneParams {
  service_id: number
  domain: string
  dnssec: 1 | 0
}

export interface DnsRecordDetails extends AddDnsRecordParams {}

export interface AddDnsRecordParams extends RemoveDnsRecordParams {
  content: string
  ttl: number //TTL
}

export interface RemoveDnsRecordParams {
  service_id: number
  domain: string // Domain
  name: string // @
  type: DNSType
}

export interface DnsZoneError {
  message: string
}

enum DNSType {
  SOA = 'SOA',
  A = 'A',
  AAAA = 'AAAA',
  CNAME = 'CNAME',
  MX = 'MX',
  NS = 'NS',
  PTR = 'PTR',
  SRV = 'SRV',
  TXT = 'TXT',
}
