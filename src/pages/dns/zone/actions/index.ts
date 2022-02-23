import { AsyncActionMode } from 'common/models'
import {
  CreateDnsZoneParams,
  DnsZoneDetails,
  ExportDnsZoneParams,
  SetSoaTtlDnsZoneParams,
  SetDnsSecDnsZoneParams,
  AddDnsRecordParams,
  RemoveDnsRecordParams,
  GetZoneParams,
  GetAllZonesParams,
  DnsZoneError,
  DeleteDnsZoneParams,
  DnsZone,
} from '../models'

export enum ActionType {
  CREATE_DNS_ZONE = 'CREATE_DNS_ZONE',
  GET_DNS_ZONES = 'GET_DNS_ZONES',
  GET_DNS_ZONE = 'GET_DNS_ZONE',
  DELETE_DNS_ZONE = 'DELETE_DNS_ZONE',
  EXPORT_DNS_ZONE = 'EXPORT_DNS_ZONE',
  SET_SOA_TTL_DNS_ZONE = 'SET_SOA_TTL_DNS_ZONE',
  SET_DNSSEC_DNS_ZONE = 'SET_DNSSEC_DNS_ZONE',
  ADD_RECORD_DNS_ZONE = 'ADD_RECORD_DNS_ZONE',
  REMOVE_RECORD_DNS_ZONE = 'REMOVE_RECORD_DNS_ZONE',
  GET_ARCHIVED_DNS_ZONE = 'GET_ARCHIVED_DNS_ZONE',
}

export type DnsZoneActions =
  | CreateDnsZoneRequestAction
  | CreateDnsZoneResponseAction
  | CreateDnsZoneErrorAction
  | GetDnsZonesRequestAction
  | GetDnsZonesResponseAction
  | GetDnsZonesErrorAction
  | GetDnsZoneRequestAction
  | GetDnsZoneResponseAction
  | GetDnsZoneErrorAction
  | DeleteDnsZoneRequestAction
  | DeleteDnsZoneResponseAction
  | DeleteDnsZoneErrorAction
  | ExportDnsZoneRequestAction
  | ExportDnsZoneResponseAction
  | ExportDnsZoneErrorAction
  | SetSoaTtlDnsZoneRequestAction
  | SetSoaTtlDnsZoneResponseAction
  | SetSoaTtlDnsZoneErrorAction
  | SetDnsSecDnsZoneRequestAction
  | SetDnsSecDnsZoneResponseAction
  | SetDnsSecDnsZoneErrorAction
  | AddDnsRecordRequestAction
  | AddDnsRecordResponseAction
  | AddDnsRecordErrorAction
  | RemoveDnsRecordRequestAction
  | RemoveDnsRecordResponseAction
  | RemoveDnsRecordErrorAction
  | GetArchivedDnsZoneRequestAction
  | GetArchivedDnsZoneResponseAction
  | GetArchivedDnsZoneErrorAction

export class GetArchivedDnsZoneRequestAction {
  readonly type = ActionType.GET_ARCHIVED_DNS_ZONE
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload: GetZoneParams) {}
}
export class GetArchivedDnsZoneResponseAction {
  readonly type = ActionType.GET_ARCHIVED_DNS_ZONE
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: GetArchivedDnsZoneRequestAction,
    public data: DnsZoneDetails
  ) {}
}
export class GetArchivedDnsZoneErrorAction {
  readonly type = ActionType.GET_ARCHIVED_DNS_ZONE
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: GetArchivedDnsZoneRequestAction,
    public error: DnsZoneError
  ) {}
}

export class RemoveDnsRecordRequestAction {
  readonly type = ActionType.REMOVE_RECORD_DNS_ZONE
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload: RemoveDnsRecordParams) {}
}
export class RemoveDnsRecordResponseAction {
  readonly type = ActionType.REMOVE_RECORD_DNS_ZONE
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: RemoveDnsRecordRequestAction,
    public data: DnsZoneDetails
  ) {}
}
export class RemoveDnsRecordErrorAction {
  readonly type = ActionType.REMOVE_RECORD_DNS_ZONE
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: RemoveDnsRecordRequestAction,
    public error: DnsZoneError
  ) {}
}

export class AddDnsRecordRequestAction {
  readonly type = ActionType.ADD_RECORD_DNS_ZONE
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload: AddDnsRecordParams) {}
}
export class AddDnsRecordResponseAction {
  readonly type = ActionType.ADD_RECORD_DNS_ZONE
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: AddDnsRecordRequestAction,
    public data: DnsZoneDetails
  ) {}
}
export class AddDnsRecordErrorAction {
  readonly type = ActionType.ADD_RECORD_DNS_ZONE
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: AddDnsRecordRequestAction,
    public error: DnsZoneError
  ) {}
}

export class SetDnsSecDnsZoneRequestAction {
  readonly type = ActionType.SET_DNSSEC_DNS_ZONE
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload: SetDnsSecDnsZoneParams) {}
}
export class SetDnsSecDnsZoneResponseAction {
  readonly type = ActionType.SET_DNSSEC_DNS_ZONE
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: SetDnsSecDnsZoneRequestAction,
    public data: DnsZoneDetails
  ) {}
}
export class SetDnsSecDnsZoneErrorAction {
  readonly type = ActionType.SET_DNSSEC_DNS_ZONE
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: SetDnsSecDnsZoneRequestAction,
    public error: DnsZoneError
  ) {}
}

export class SetSoaTtlDnsZoneRequestAction {
  readonly type = ActionType.SET_SOA_TTL_DNS_ZONE
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload: SetSoaTtlDnsZoneParams) {}
}
export class SetSoaTtlDnsZoneResponseAction {
  readonly type = ActionType.SET_SOA_TTL_DNS_ZONE
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: SetSoaTtlDnsZoneRequestAction,
    public data: DnsZoneDetails
  ) {}
}
export class SetSoaTtlDnsZoneErrorAction {
  readonly type = ActionType.SET_SOA_TTL_DNS_ZONE
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: SetSoaTtlDnsZoneRequestAction,
    public error: DnsZoneError
  ) {}
}

export class ExportDnsZoneRequestAction {
  readonly type = ActionType.EXPORT_DNS_ZONE
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload: ExportDnsZoneParams) {}
}
export class ExportDnsZoneResponseAction {
  readonly type = ActionType.EXPORT_DNS_ZONE
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: ExportDnsZoneRequestAction,
    public data: DnsZoneDetails
  ) {}
}
export class ExportDnsZoneErrorAction {
  readonly type = ActionType.EXPORT_DNS_ZONE
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: ExportDnsZoneRequestAction,
    public error: DnsZoneError
  ) {}
}

export class CreateDnsZoneRequestAction {
  readonly type = ActionType.CREATE_DNS_ZONE
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload: CreateDnsZoneParams) {}
}
export class CreateDnsZoneResponseAction {
  readonly type = ActionType.CREATE_DNS_ZONE
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: CreateDnsZoneRequestAction,
    public data: DnsZone[]
  ) {}
}
export class CreateDnsZoneErrorAction {
  readonly type = ActionType.CREATE_DNS_ZONE
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: CreateDnsZoneRequestAction,
    public error: DnsZoneError
  ) {}
}

export class GetDnsZoneRequestAction {
  readonly type = ActionType.GET_DNS_ZONE
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload: GetZoneParams) {}
}
export class GetDnsZoneResponseAction {
  readonly type = ActionType.GET_DNS_ZONE
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: GetDnsZoneRequestAction,
    public data: DnsZoneDetails
  ) {}
}
export class GetDnsZoneErrorAction {
  readonly type = ActionType.GET_DNS_ZONE
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: GetDnsZoneRequestAction,
    public error: DnsZoneError
  ) {}
}

export class GetDnsZonesRequestAction {
  readonly type = ActionType.GET_DNS_ZONES
  readonly mode = AsyncActionMode.REQUEST
  constructor(public paylosd: GetAllZonesParams) {
    ''
  }
}
export class GetDnsZonesResponseAction {
  readonly type = ActionType.GET_DNS_ZONES
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: GetDnsZonesRequestAction,
    public data: DnsZone[]
  ) {}
}
export class GetDnsZonesErrorAction {
  readonly type = ActionType.GET_DNS_ZONES
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: GetDnsZonesRequestAction,
    public error: DnsZoneError
  ) {}
}

export class DeleteDnsZoneRequestAction {
  readonly type = ActionType.DELETE_DNS_ZONE
  readonly mode = AsyncActionMode.REQUEST
  constructor(public params: DeleteDnsZoneParams) {
    ''
  }
}
export class DeleteDnsZoneResponseAction {
  readonly type = ActionType.DELETE_DNS_ZONE
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: DeleteDnsZoneRequestAction,
    public data: DnsZone[]
  ) {}
}
export class DeleteDnsZoneErrorAction {
  readonly type = ActionType.DELETE_DNS_ZONE
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: DeleteDnsZoneRequestAction,
    public error: DnsZoneError
  ) {}
}
