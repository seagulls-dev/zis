import { AsyncActionMode } from 'common/models'
import { CreateIpParams, UpdateIpParams, ErrorIp, IpDetails } from '../models'

export enum ActionType {
  GET_IP = 'GET_IP',
  LIST_IP = 'LIST_IP',
  CREATE_IP = 'CREATE_IP',
  UPDATE_IP = 'UPDATE_IP',
  DELETE_IP = 'DELETE_IP',
}

export type IpActions =
  | GetIpRequestAction
  | GetIpResponseAction
  | GetIpErrorAction
  | ListIpRequestAction
  | ListIpResponseAction
  | ListIpErrorAction
  | CreateIpRequestAction
  | CreateIpResponseAction
  | CreateIpErrorAction
  | UpdateIpRequestAction
  | UpdateIpResponseAction
  | UpdateIpErrorAction
  | DeleteIpRequestAction
  | DeleteIpResponseAction
  | DeleteIpErrorAction

export class GetIpRequestAction {
  readonly type = ActionType.GET_IP
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload: number) {}
}
export class GetIpResponseAction {
  readonly type = ActionType.GET_IP
  readonly mode = AsyncActionMode.RESPONSE
  constructor(public request: GetIpRequestAction, public data: IpDetails) {}
}
export class GetIpErrorAction {
  readonly type = ActionType.GET_IP
  readonly mode = AsyncActionMode.ERROR
  constructor(public request: GetIpRequestAction, public error: ErrorIp) {}
}

export class ListIpRequestAction {
  readonly type = ActionType.LIST_IP
  readonly mode = AsyncActionMode.REQUEST
  constructor() {
    ''
  }
}
export class ListIpResponseAction {
  readonly type = ActionType.LIST_IP
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: ListIpRequestAction,
    public ipList: IpDetails[],
  ) {}
}
export class ListIpErrorAction {
  readonly type = ActionType.LIST_IP
  readonly mode = AsyncActionMode.ERROR
  constructor(public request: ListIpRequestAction, public error: ErrorIp) {}
}

export class CreateIpRequestAction {
  readonly type = ActionType.CREATE_IP
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload: CreateIpParams) {}
}
export class CreateIpResponseAction {
  readonly type = ActionType.CREATE_IP
  readonly mode = AsyncActionMode.RESPONSE
  constructor(public request: CreateIpRequestAction, public data: IpDetails) {}
}
export class CreateIpErrorAction {
  readonly type = ActionType.CREATE_IP
  readonly mode = AsyncActionMode.ERROR
  constructor(public request: CreateIpRequestAction, public error: ErrorIp) {}
}

export class UpdateIpRequestAction {
  readonly type = ActionType.UPDATE_IP
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload: UpdateIpParams) {
    ''
  }
}
export class UpdateIpResponseAction {
  readonly type = ActionType.UPDATE_IP
  readonly mode = AsyncActionMode.RESPONSE
  constructor(public request: UpdateIpRequestAction, public data: IpDetails) {}
}
export class UpdateIpErrorAction {
  readonly type = ActionType.UPDATE_IP
  readonly mode = AsyncActionMode.ERROR
  constructor(public request: UpdateIpRequestAction, public error: ErrorIp) {}
}

export class DeleteIpRequestAction {
  readonly type = ActionType.DELETE_IP
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload: number) {
    ''
  }
}
export class DeleteIpResponseAction {
  readonly type = ActionType.DELETE_IP
  readonly mode = AsyncActionMode.RESPONSE
  constructor(public request: DeleteIpRequestAction, public id: number) {}
}
export class DeleteIpErrorAction {
  readonly type = ActionType.DELETE_IP
  readonly mode = AsyncActionMode.ERROR
  constructor(public request: DeleteIpRequestAction, public error: ErrorIp) {}
}
