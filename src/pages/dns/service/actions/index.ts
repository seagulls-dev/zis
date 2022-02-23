import { AsyncActionMode } from 'common/models'
import {
  CreateDnsServiceParams,
  DnsServiceDetails,
  DnsServiceError,
  UpdateDnsServiceParams,
} from '../models'

export enum ActionType {
  CREATE_DNSSERVICE = 'CREATE_DNSSERVICE',
  GET_DNSSERVICEES = 'GET_DNSSERVICEES',
  GET_DNSSERVICE = 'GET_DNSSERVICE',
  UPDATE_DNSSERVICE = 'UPDATE_DNSSERVICE',
  DELETE_DNSSERVICE = 'DELETE_DNSSERVICE',
}

export type DnsServiceActions =
  | CreateDnsServiceRequestAction
  | CreateDnsServiceResponseAction
  | CreateDnsServiceErrorAction
  | GetDnsServicesRequestAction
  | GetDnsServicesResponseAction
  | GetDnsServicesErrorAction
  | GetDnsServiceRequestAction
  | GetDnsServiceResponseAction
  | GetDnsServiceErrorAction
  | UpdateDnsServiceRequestAction
  | UpdateDnsServiceResponseAction
  | UpdateDnsServiceErrorAction
  | DeleteDnsServiceRequestAction
  | DeleteDnsServiceResponseAction
  | DeleteDnsServiceErrorAction

export class CreateDnsServiceRequestAction {
  readonly type = ActionType.CREATE_DNSSERVICE
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload: CreateDnsServiceParams) {}
}
export class CreateDnsServiceResponseAction {
  readonly type = ActionType.CREATE_DNSSERVICE
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: CreateDnsServiceRequestAction,
    public data: DnsServiceDetails,
  ) {}
}
export class CreateDnsServiceErrorAction {
  readonly type = ActionType.CREATE_DNSSERVICE
  readonly mode = AsyncActionMode.ERROR
  constructor(public request: CreateDnsServiceRequestAction, public error: DnsServiceError) {}
}

export class GetDnsServiceRequestAction {
  readonly type = ActionType.GET_DNSSERVICE
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload: number) {
    ''
  }
}
export class GetDnsServiceResponseAction {
  readonly type = ActionType.GET_DNSSERVICE
  readonly mode = AsyncActionMode.RESPONSE
  constructor(public request: GetDnsServiceRequestAction, public data: DnsServiceDetails) {}
}
export class GetDnsServiceErrorAction {
  readonly type = ActionType.GET_DNSSERVICE
  readonly mode = AsyncActionMode.ERROR
  constructor(public request: GetDnsServiceRequestAction, public error: DnsServiceError) {}
}

export class GetDnsServicesRequestAction {
  readonly type = ActionType.GET_DNSSERVICEES
  readonly mode = AsyncActionMode.REQUEST
  constructor() {
    ''
  }
}
export class GetDnsServicesResponseAction {
  readonly type = ActionType.GET_DNSSERVICEES
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: GetDnsServicesRequestAction,
    public data: DnsServiceDetails[],
  ) {}
}
export class GetDnsServicesErrorAction {
  readonly type = ActionType.GET_DNSSERVICEES
  readonly mode = AsyncActionMode.ERROR
  constructor(public request: GetDnsServicesRequestAction, public error: DnsServiceError) {}
}

export class UpdateDnsServiceRequestAction {
  readonly type = ActionType.UPDATE_DNSSERVICE
  readonly mode = AsyncActionMode.REQUEST
  constructor(public id: UpdateDnsServiceParams) {}
}
export class UpdateDnsServiceResponseAction {
  readonly type = ActionType.UPDATE_DNSSERVICE
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: UpdateDnsServiceRequestAction,
    public data: DnsServiceDetails,
  ) {}
}
export class UpdateDnsServiceErrorAction {
  readonly type = ActionType.UPDATE_DNSSERVICE
  readonly mode = AsyncActionMode.ERROR
  constructor(public request: UpdateDnsServiceRequestAction, public error: DnsServiceError) {}
}

export class DeleteDnsServiceRequestAction {
  readonly type = ActionType.DELETE_DNSSERVICE
  readonly mode = AsyncActionMode.REQUEST
  constructor(public id: number) {
    ''
  }
}
export class DeleteDnsServiceResponseAction {
  readonly type = ActionType.DELETE_DNSSERVICE
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: DeleteDnsServiceRequestAction,
    public data: DnsServiceDetails,
  ) {}
}
export class DeleteDnsServiceErrorAction {
  readonly type = ActionType.DELETE_DNSSERVICE
  readonly mode = AsyncActionMode.ERROR
  constructor(public request: DeleteDnsServiceRequestAction, public error: DnsServiceError) {}
}
