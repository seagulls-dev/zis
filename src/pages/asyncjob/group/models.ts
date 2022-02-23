export interface AsyncJobGroupState {
	isSaving?: boolean
	isLoading?: boolean
	asyncjobgroup?: AsyncJobGroupDetails
	asyncjobgroups?: AsyncJobGroupDetails[]
	error?: AsyncJobGroupError
}

export interface AsyncJobGroupDetails {
	id: number
	name: string
}

export interface AsyncJobGroupParams {
	id?: number
	name: string
}
export interface DeleteAsyncJobGroupParams {
	id: number
}

export interface AsyncJobGroupError {
	message: string
}
