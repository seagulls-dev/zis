import { AsyncActionMode } from 'common/models'
import { RolePermissionDetails } from '../models'

export enum ActionType {
  GET_ROLES = 'GET_ROLES',
  GET_ROLES_PERMISSIONS = 'GET_ROLES_PERMISSIONS',
}

export type RoleActions =
  | GetRoleRequestAction
  | GetRoleResponseAction
  | GetRoleErrorAction
  | GetRolePermissionRequestAction
  | GetRolePermissionGroupResponseAction
  | GetRolePermissionGroupErrorAction

export class GetRoleRequestAction {
  readonly type = ActionType.GET_ROLES
  readonly mode = AsyncActionMode.REQUEST
  constructor() {
    ''
  }
}
export class GetRoleResponseAction {
  readonly type = ActionType.GET_ROLES
  readonly mode = AsyncActionMode.RESPONSE
  constructor(public request: GetRoleRequestAction, public data: string[]) {}
}
export class GetRoleErrorAction {
  readonly type = ActionType.GET_ROLES
  readonly mode = AsyncActionMode.ERROR
  constructor(public request: GetRoleRequestAction, public error: string) {}
}

export class GetRolePermissionRequestAction {
  readonly type = ActionType.GET_ROLES_PERMISSIONS
  readonly mode = AsyncActionMode.REQUEST
  constructor() {
    ''
  }
}
export class GetRolePermissionGroupResponseAction {
  readonly type = ActionType.GET_ROLES_PERMISSIONS
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: GetRolePermissionRequestAction,
    public data: RolePermissionDetails[],
  ) {}
}
export class GetRolePermissionGroupErrorAction {
  readonly type = ActionType.GET_ROLES_PERMISSIONS
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: GetRolePermissionRequestAction,
    public error: string,
  ) {}
}
