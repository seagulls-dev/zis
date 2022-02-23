import {IpDetails} from 'pages/ip/ip-address/models'

export interface ServerState {
	isSaving?: boolean
	isLoading?: boolean
	server?: ServerDetails
	servers?: ServerDetails[]
	error?: ServerError
	serverServiceTypes?: ServerServiceTypeDetails[]
}

export interface ServerDetails {
	id: number
	hostname: string
	primary_ip_id: number
	customer_id: number
	server_type: string
	location_id: number //Server ID
	vps_type: string
	zis_management: string
	customer_management: string
	server_backup: string
	server_monitoring: string
	comment?: string
	created_at?: Date
	updated_at?: Date
	deleted_at?: Date
	location?: string
	addresses?: IpDetails[]
	services?: ServerService[]
}

export interface CreateUpdateServerParams {
	hostname: string
	primary_ip_id: number
	customer_id: number
	server_type: ServerTypeEnum
	location_id: number //Server ID
	vps_type: VPSTypeEnum
	zis_management: ZISManagementEnum
	customer_management: CustomerManagementEnum
	server_backup: ServerBackupEnum
	server_monitoring: ServerMonitoringEnum
	comment?: string
	created_at?: Date
	updated_at?: Date
	deleted_at?: Date
	location?: string
	addresses?: IpDetails[]
	services?: ServerService[]
}

export interface ServerService {
	id: number
	name: string
}

export interface ServerAddRemoveIpParams {
	server_id: number
	address_id: number
}
export interface AddRemoveIpResponse {
	server_id: number
	address_id: number
	id: number
	address: IpDetails
}

export interface DeleteServerParams {
	id: number
}

export interface ServerError {
	message: string
}

export enum ScenarioUpdateEnum {
	SCENARIO_UPDATE_MONITOR = 'update_monitor',
	SCENARIO_UPDATE_CUSTOMER = 'update_customer',
	SCENARIO_UPDATE_BACKUP = 'update_backup',
}
export enum ServerTypeEnum {
	SERVER_TYPE_BARE_METAL = 'bare_metal',
	SERVER_TYPE_VIRTUAL_SERVER = 'virtual_server',
}
export enum VPSTypeEnum {
	VPS_TYPE_NONE = 'none',
	VPS_TYPE_CORPORATE = 'corporate',
	VPS_TYPE_BUSINESS = 'bussiness',
	VPS_TYPE_STANDARD = 'standard',
}
export enum ZISManagementEnum {
	ZIS_MANAGEMENT_NONE = 'no_management',
	ZIS_MANAGEMENT_SERVICES = 'managed_services',
	ZIS_MANAGEMENT_FULL = 'fully_managed',
}
export enum CustomerManagementEnum {
	CUSTOMER_MANAGEMENT_NONE = 'no_management',
	CUSTOMER_MANAGEMENT_CUSTOMER = 'customer_managed',
	CUSTOMER_MANAGEMENT_BASIC = 'basic_managed',
	CUSTOMER_MANAGEMENT_FULL = 'fully_managed',
}
export enum ServerBackupEnum {
	SERVER_BACKUP_NONE = 'none',
	SERVER_BACKUP_ONE = 'one_location',
	SERVER_BACKUP_TWO = 'two_locations',
}
export enum ServerMonitoringEnum {
	SERVER_MONITORING_NONE = 'none',
	SERVER_MONITORING_PING = 'ping_only',
	SERVER_MONITORING_EXTERNAL = 'external_monitoring',
	SERVER_MONITORING_FULL = 'full_monitoring',
}

export enum ServerServiceTypeEnum {
	BACULA_CLIENT = 'bacula_client',
	BACULA_SERVER = 'bacula_server',
	DNS = 'dns',
	FTP = 'ftp',
	MAIL = 'mail',
	MYSQL = 'mysql',
	PROXMOX = 'proxmox',
	WEB_EP = 'web_ep',
	WEB_PHP = 'web_php',
	WEB_RUBY = 'web_ruby',
}
export interface ServerServiceTypeDetails {
	id: 8
	name: ServerServiceTypeEnum
}
