import {PROTOCOL_ENUM, WEBSERVER_ENUM, BACKEND_ENUM} from 'common/enums'

export interface VhostState {
	isSaving?: boolean
	isLoading?: boolean
	vhost?: VhostDetails
	vhosts?: VhostDetails[]
	error?: VhostError
}

export interface VhostDetails extends CreateVhostParams {
	id: number
	custom_config?: string
	is_sync?: boolean // is changes apllyed
	daemon?: string
	fpm?: string
	aliases?: AliasDetail[]
	settings?: string[]
	certificate_id?: number
	force_redirect?: boolean
	children?: VhostDetails[]
}

export interface AliasDetail {
	certificate_id: number
	force_redirect: boolean
	hostname: string
	id: number
	vhost_id: number
}

export interface CreateVhostParams {
	server_id: number
	customer_id: number
	protocol: PROTOCOL_ENUM
	hostname: string
	web_server: WEBSERVER_ENUM
	backend: BACKEND_ENUM
	database_id?: number
	mail_server_id?: number
}

export interface UpdateVhostParams {
	id: number
	server_id: number
	customer_id: number
	protocol: PROTOCOL_ENUM
	hostname: string
	web_server: WEBSERVER_ENUM
	backend: BACKEND_ENUM
	database_id?: number
	mail_server_id?: number
	ssl?: boolean
	certificate_id?: number
	force_redirect?: boolean
	redirect_https?: boolean
}

export interface UpdateVhostCustomConfigParams {
	id: number
	custom_config: string
}

export interface ActivateVhostParams {
	id: number
	active: boolean
}
// get-version(service_id), get-applicattions(service_id), get-applicattions-by-server(server_id), apply-changes(vhost-id)
export interface DeleteVhostParams {
	id: number
}

export interface VhostError {
	message: string
}
