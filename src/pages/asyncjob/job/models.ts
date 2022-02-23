export interface AsyncJobState {
	isSaving: boolean
	isLoading: boolean
	asyncjob?: AsyncJobDetails
	asyncjobs?: AsyncJobDetails[]
	error?: AsyncJobError
	actionedId?: number // id of currently actioned job
}

export interface AsyncJobDetails {
	id: number
	parent_id?: number
	group_id?: number
	server_id: number
	service_id?: number
	user_id: number
	object_id?: number
	name: string
	desc: string // description
	args: string // base64
	result: string
	state: AsyncJobStateEnum
	max_running_time?: number // seconds
	start_after?: number // seconds
	runtime: number
	totaltime: number
	running_at: number
	finished_at: number
	group: null
}

enum AsyncJobStateEnum {
	NEW = 'new',
	WAITING = 'waiting',
	READY = 'ready',
	RUNUNG = 'running',
	DONE = 'done',
	ERROR = 'error',
	ERROR_RESOLVED = 'error_resolved',
}

export enum AsyncJobServiceEnum {
	DNS = 'DNS',
	CERT = 'Certificate',
	MYSQL = 'MySQL',
	WEB_PHP = 'Web PHP',
}

export enum AsyncJobObjectEnum {
	DOMAIN = 'Domain',
	VHOST = 'vHost',
	DATABASE = 'Database',
	DNS_ZONE = 'DNS zone',
}

export interface AsyncJobParams {
	name: string
	server_id: number
	user_id: number
	args: {}
	parent_id?: number
	group_id?: number
	service_id?: number
	object_id?: number
	max_running_time?: number // seconds
	start_after?: number // seconds
}

export interface AsyncJobError {
	message: string
}
