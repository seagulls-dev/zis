export interface AliasState {
	isSaving?: boolean
	isLoading?: boolean
	alias?: AliasDetails
	aliases?: AliasDetails[]
	error?: AliasError
}

export interface AliasDetails {
	id: number
	vhost_id: number
	hostname: string
	certificate_id?: number
	force_redirect?: number
}

export interface CreateAliasParams extends Object {
	vhost_id: number
	hostname: string
	certificate_id?: number
	force_redirect?: number
}

export interface UpdateAliasParams {
	vhost_id: number
	certificate_id?: number
	force_redirect?: number
}

export interface AliasError {
	message: string
}
