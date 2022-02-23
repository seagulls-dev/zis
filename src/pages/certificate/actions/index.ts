import {AsyncActionMode} from 'common/models'
import {
	CreateCertificateParams,
	CertificateDetails,
	CertificateError,
	UpdateCertificateParams,
	ToggleCertificatesParams,
} from '../models'

export enum ActionType {
	CREATE_CERTIFICATE = 'CREATE_CERTIFICATE',
	GET_CERTIFICATES = 'GET_CERTIFICATES',
	GET_CERTIFICATES_BY_VHOST = 'GET_CERTIFICATES_BY_VHOST',
	GET_CERTIFICATE = 'GET_CERTIFICATE',
	UPDATE_CERTIFICATE = 'UPDATE_CERTIFICATE',
	DELETE_CERTIFICATE = 'DELETE_CERTIFICATE',
	ADD_CERTIFICATE_TO_VHOST = 'ADD_CERTIFICATE_TO_VHOST',
	REMOVE_CERTIFICATE_FROM_VHOST = 'REMOVE_CERTIFICATE_FROM_VHOST',
}

export type CertificateActions =
	| CreateCertificateRequestAction
	| CreateCertificateResponseAction
	| CreateCertificateErrorAction
	| GetCertificatesRequestAction
	| GetCertificatesResponseAction
	| GetCertificatesErrorAction
	| GetCertificateRequestAction
	| GetCertificateResponseAction
	| GetCertificateErrorAction
	| UpdateCertificateRequestAction
	| UpdateCertificateResponseAction
	| UpdateCertificateErrorAction
	| DeleteCertificateRequestAction
	| DeleteCertificateResponseAction
	| DeleteCertificateErrorAction
	| GetCertificatesByVhostRequestAction
	| GetCertificatesByVhostResponseAction
	| GetCertificatesByVhostErrorAction
	| AddCertificatesToVhostRequestAction
	| AddCertificatesToVhostResponseAction
	| AddCertificatesToVhostErrorAction
	| RemoveCertificatesFromVhostRequestAction
	| RemoveCertificatesFromVhostResponseAction
	| RemoveCertificatesFromVhostErrorAction

export class RemoveCertificatesFromVhostRequestAction {
	readonly type = ActionType.REMOVE_CERTIFICATE_FROM_VHOST
	readonly mode = AsyncActionMode.REQUEST
	constructor(public payload: ToggleCertificatesParams) {
		''
	}
}
export class RemoveCertificatesFromVhostResponseAction {
	readonly type = ActionType.REMOVE_CERTIFICATE_FROM_VHOST
	readonly mode = AsyncActionMode.RESPONSE
	constructor(public request: RemoveCertificatesFromVhostRequestAction, public data: CertificateDetails) {}
}
export class RemoveCertificatesFromVhostErrorAction {
	readonly type = ActionType.REMOVE_CERTIFICATE_FROM_VHOST
	readonly mode = AsyncActionMode.ERROR
	constructor(public request: RemoveCertificatesFromVhostRequestAction, public error: CertificateError) {}
}

export class AddCertificatesToVhostRequestAction {
	readonly type = ActionType.ADD_CERTIFICATE_TO_VHOST
	readonly mode = AsyncActionMode.REQUEST
	constructor(public payload: ToggleCertificatesParams) {
		''
	}
}
export class AddCertificatesToVhostResponseAction {
	readonly type = ActionType.ADD_CERTIFICATE_TO_VHOST
	readonly mode = AsyncActionMode.RESPONSE
	constructor(public request: AddCertificatesToVhostRequestAction, public data: CertificateDetails) {}
}
export class AddCertificatesToVhostErrorAction {
	readonly type = ActionType.ADD_CERTIFICATE_TO_VHOST
	readonly mode = AsyncActionMode.ERROR
	constructor(public request: AddCertificatesToVhostRequestAction, public error: CertificateError) {}
}

export class GetCertificatesByVhostRequestAction {
	readonly type = ActionType.GET_CERTIFICATES_BY_VHOST
	readonly mode = AsyncActionMode.REQUEST
	constructor(public payload: number) {
		''
	}
}
export class GetCertificatesByVhostResponseAction {
	readonly type = ActionType.GET_CERTIFICATES_BY_VHOST
	readonly mode = AsyncActionMode.RESPONSE
	constructor(public request: GetCertificatesByVhostRequestAction, public data: CertificateDetails[]) {}
}
export class GetCertificatesByVhostErrorAction {
	readonly type = ActionType.GET_CERTIFICATES_BY_VHOST
	readonly mode = AsyncActionMode.ERROR
	constructor(public request: GetCertificatesByVhostRequestAction, public error: CertificateError) {}
}

export class CreateCertificateRequestAction {
	readonly type = ActionType.CREATE_CERTIFICATE
	readonly mode = AsyncActionMode.REQUEST
	constructor(public payload: CreateCertificateParams) {}
}
export class CreateCertificateResponseAction {
	readonly type = ActionType.CREATE_CERTIFICATE
	readonly mode = AsyncActionMode.RESPONSE
	constructor(public request: CreateCertificateRequestAction, public data: CertificateDetails) {}
}
export class CreateCertificateErrorAction {
	readonly type = ActionType.CREATE_CERTIFICATE
	readonly mode = AsyncActionMode.ERROR
	constructor(public request: CreateCertificateRequestAction, public error: CertificateError) {}
}

export class GetCertificateRequestAction {
	readonly type = ActionType.GET_CERTIFICATE
	readonly mode = AsyncActionMode.REQUEST
	constructor(public payload: number) {
		''
	}
}
export class GetCertificateResponseAction {
	readonly type = ActionType.GET_CERTIFICATE
	readonly mode = AsyncActionMode.RESPONSE
	constructor(public request: GetCertificateRequestAction, public data: CertificateDetails) {}
}
export class GetCertificateErrorAction {
	readonly type = ActionType.GET_CERTIFICATE
	readonly mode = AsyncActionMode.ERROR
	constructor(public request: GetCertificateRequestAction, public error: CertificateError) {}
}

export class GetCertificatesRequestAction {
	readonly type = ActionType.GET_CERTIFICATES
	readonly mode = AsyncActionMode.REQUEST
	constructor() {
		''
	}
}
export class GetCertificatesResponseAction {
	readonly type = ActionType.GET_CERTIFICATES
	readonly mode = AsyncActionMode.RESPONSE
	constructor(public request: GetCertificatesRequestAction, public data: CertificateDetails[]) {}
}
export class GetCertificatesErrorAction {
	readonly type = ActionType.GET_CERTIFICATES
	readonly mode = AsyncActionMode.ERROR
	constructor(public request: GetCertificatesRequestAction, public error: CertificateError) {}
}

export class UpdateCertificateRequestAction {
	readonly type = ActionType.UPDATE_CERTIFICATE
	readonly mode = AsyncActionMode.REQUEST
	constructor(public params: UpdateCertificateParams) {}
}
export class UpdateCertificateResponseAction {
	readonly type = ActionType.UPDATE_CERTIFICATE
	readonly mode = AsyncActionMode.RESPONSE
	constructor(public request: UpdateCertificateRequestAction, public data: CertificateDetails) {}
}
export class UpdateCertificateErrorAction {
	readonly type = ActionType.UPDATE_CERTIFICATE
	readonly mode = AsyncActionMode.ERROR
	constructor(public request: UpdateCertificateRequestAction, public error: CertificateError) {}
}

export class DeleteCertificateRequestAction {
	readonly type = ActionType.DELETE_CERTIFICATE
	readonly mode = AsyncActionMode.REQUEST
	constructor(public id: number) {
		''
	}
}
export class DeleteCertificateResponseAction {
	readonly type = ActionType.DELETE_CERTIFICATE
	readonly mode = AsyncActionMode.RESPONSE
	constructor(public request: DeleteCertificateRequestAction, public data: CertificateDetails) {}
}
export class DeleteCertificateErrorAction {
	readonly type = ActionType.DELETE_CERTIFICATE
	readonly mode = AsyncActionMode.ERROR
	constructor(public request: DeleteCertificateRequestAction, public error: CertificateError) {}
}
