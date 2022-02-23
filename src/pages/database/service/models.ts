export interface DbServiceState {
	isSaving?: boolean
	isLoading?: boolean
	dbservice?: DbServiceDetails
	dbservices?: DbServiceDetails[]
	dbdrivers: {}
	error?: DbServiceError
}

export interface DbServiceDetails {
	id: number
	name: string
	rate: number
	valid_from: Date
	valid_to: Date
	country: string
	deleted_at?: string
}

export interface CreateDbServiceParams {
	name: string
	rate: number
	valid_from: Date
	valid_to?: Date
	country: string
}

export interface UpdateDbServiceParams {
	id: number
	name: string
	rate: number
	valid_from: Date
	valid_to?: Date
	country: string
}
export interface DeleteDbServiceParams {
	id: number
}

export interface DbServiceError {
	message: string
}
