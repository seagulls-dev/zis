export interface CertificateState {
	isSaving?: boolean
	isLoading?: boolean
	certificate?: CertificateDetails
	certificates?: CertificateDetails[]
	vhosts?: [{[key: string]: CertificateDetails[]}]
	error?: CertificateError
}

export interface CertificateDetails {
	id: number
	authority?: string
	name: string
	challenge: string
	key?: string
	crt?: string
	ca_crt?: string
	auto_prolong?: number
	comment?: string
	servers?: CertificateVhost[]
	subjects?: string
	valid_from?: number
	valid_to?: number
}

export interface CertificateVhost {
	id: number
	vhost_id: number
}
export interface CreateCertificateParams {
	name: string
	challenge: CHALLENGE_ENUM
	key: string
	crt: string
	ca_crt: string
	auto_prolong?: number
	comment?: string
}

export interface UpdateCertificateParams {
	id: number
	challenge?: CHALLENGE_ENUM
	key?: string
	crt?: string
	ca_crt?: string
	auto_prolong?: number
	comment?: string
}

export enum CHALLENGE_ENUM {
	CHALLENGE_MANUAL = 'manual',
	CHALLENGE_DNS = 'dns-01',
	CHALLENGE_HTTP = 'http-01',
}

export interface DeleteCertificateParams {
	id: number
}

export interface AddRemoveToServerCertificateParams {
	certificate_id: number
	server_id: number
}

export interface CertificateError {
	message: string
}

export interface ToggleCertificatesParams {
	certificate_id: number
	vhost_id: number
}
