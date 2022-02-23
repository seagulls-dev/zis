import { AsyncActionMode } from 'common/models'
import {
  ErrorSubnetIp,
  IpSubnetDetails,
  UpdateSubnetIpParams,
  CreateSubnetIpParams,
} from '../models'

export enum ActionType {
  GET_SUBNET_IP = 'GET_SUBNET_IP',
  LIST_SUBNET_IP = 'LIST_SUBNET_IP',
  CREATE_SUBNET_IP = 'CREATE_SUBNET_IP',
  UPDATE_SUBNET_IP = 'UPDATE_SUBNET_IP',
  DELETE_SUBNET_IP = 'DELETE_SUBNET_IP',
}

export type IpSubnetActions =
  | GetSubnetIpRequestAction
  | GetSubnetIpResponseAction
  | GetSubnetIpErrorAction
  | ListSubnetIpRequestAction
  | ListSubnetIpResponseAction
  | ListSubnetIpErrorAction
  | CreateSubnetIpRequestAction
  | CreateSubnetIpResponseAction
  | CreateSubnetIpErrorAction
  | UpdateSubnetIpRequestAction
  | UpdateSubnetIpResponseAction
  | UpdateSubnetIpErrorAction
  | DeleteSubnetIpRequestAction
  | DeleteSubnetIpResponseAction
  | DeleteSubnetIpErrorAction

export class GetSubnetIpRequestAction {
  readonly type = ActionType.GET_SUBNET_IP
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload: number) {}
}
export class GetSubnetIpResponseAction {
  readonly type = ActionType.GET_SUBNET_IP
  readonly mode = AsyncActionMode.RESPONSE
  constructor(public request: GetSubnetIpRequestAction, public data) {}
}
export class GetSubnetIpErrorAction {
  readonly type = ActionType.GET_SUBNET_IP
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: GetSubnetIpRequestAction,
    public error: ErrorSubnetIp,
  ) {}
}

export class ListSubnetIpRequestAction {
  readonly type = ActionType.LIST_SUBNET_IP
  readonly mode = AsyncActionMode.REQUEST
  constructor() {
    ''
  }
}
export class ListSubnetIpResponseAction {
  readonly type = ActionType.LIST_SUBNET_IP
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: ListSubnetIpRequestAction,
    public rageList: IpSubnetDetails[],
  ) {}
}
export class ListSubnetIpErrorAction {
  readonly type = ActionType.LIST_SUBNET_IP
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: ListSubnetIpRequestAction,
    public error: ErrorSubnetIp,
  ) {}
}

export class CreateSubnetIpRequestAction {
  readonly type = ActionType.CREATE_SUBNET_IP
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload: CreateSubnetIpParams) {}
}
export class CreateSubnetIpResponseAction {
  readonly type = ActionType.CREATE_SUBNET_IP
  readonly mode = AsyncActionMode.RESPONSE
  constructor(public request: CreateSubnetIpRequestAction, public data) {}
}
export class CreateSubnetIpErrorAction {
  readonly type = ActionType.CREATE_SUBNET_IP
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: CreateSubnetIpRequestAction,
    public error: ErrorSubnetIp,
  ) {}
}

export class UpdateSubnetIpRequestAction {
  readonly type = ActionType.UPDATE_SUBNET_IP
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload: UpdateSubnetIpParams) {
    ''
  }
}
export class UpdateSubnetIpResponseAction {
  readonly type = ActionType.UPDATE_SUBNET_IP
  readonly mode = AsyncActionMode.RESPONSE
  constructor(public request: UpdateSubnetIpRequestAction, public data) {}
}
export class UpdateSubnetIpErrorAction {
  readonly type = ActionType.UPDATE_SUBNET_IP
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: UpdateSubnetIpRequestAction,
    public error: ErrorSubnetIp,
  ) {}
}

export class DeleteSubnetIpRequestAction {
  readonly type = ActionType.DELETE_SUBNET_IP
  readonly mode = AsyncActionMode.REQUEST
  constructor(public id: number) {
    ''
  }
}
export class DeleteSubnetIpResponseAction {
  readonly type = ActionType.DELETE_SUBNET_IP
  readonly mode = AsyncActionMode.RESPONSE
  constructor(public request: DeleteSubnetIpRequestAction, public id: number) {}
}
export class DeleteSubnetIpErrorAction {
  readonly type = ActionType.DELETE_SUBNET_IP
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: DeleteSubnetIpRequestAction,
    public error: ErrorSubnetIp,
  ) {}
}
