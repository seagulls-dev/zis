import { AsyncActionMode } from 'common/models'
import {
  GroupDetails,
  CreateGroupParams,
  DeleteGroupParams,
  UpdateGroupParams,
  AddDeleteUserToGroupParams,
  AddDeleteRoleToGroupParams,
} from '../models'
import {CustomerDetails} from '../../billing/customer/models'

export enum ActionType {
  USER_GROUP = 'USER_GROUP',
  CREATE_USER_GROUP = 'CREATE_USER_GROUP',
  GET_USER_GROUP = 'GET_USER_GROUP',
  UPDATE_USER_GROUP = 'UPDATE_USER_GROUP',
  DELETE_USER_GROUP = 'DELETE_USER_GROUP',
  UPDATE_USERS_IN_GROUP = 'UPDATE_USERS_IN_GROUP',
  UPDATE_ROLES_IN_GROUP = 'UPDATE_ROLES_IN_GROUP',
  GET_USER_GROUP_BY_PARENT = 'GET_USER_GROUP_BY_PARENT',
  GET_ROOT_GROUP = 'GET_ROOT_GROUP'
}

export type GroupActions =
  | UserGroupRequestAction
  | UserGroupResponseAction
  | UserGroupErrorAction
  | CreateUserGroupRequestAction
  | CreateUserGroupResponseAction
  | CreateUserGroupErrorAction
  | GetUserGroupRequestAction
  | GetUserGroupResponseAction
  | GetUserGroupErrorAction
  | UpdateUserGroupRequestAction
  | UpdateUserGroupResponseAction
  | UpdateUserGroupErrorAction
  | DeleteUserGroupRequestAction
  | DeleteUserGroupResponseAction
  | DeleteUserGroupErrorAction
  | UpdateUserInGroupRequestAction
  | UpdateUserInGroupResponseAction
  | UpdateUserInGroupErrorAction
  | UpdateRoleInGroupRequestAction
  | UpdateRoleInGroupResponseAction
  | UpdateRoleInGroupErrorAction
  | GetUserGroupByParentRequestAction
  | GetUserGroupByParentResponseAction
  | GetUserGroupByParentErrorAction
  | GetRootGroupRequestAction
  | GetRootGroupResponseAction
  | GetRootGroupErrorAction

export class UpdateRoleInGroupRequestAction {
  readonly type = ActionType.UPDATE_ROLES_IN_GROUP
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload: AddDeleteRoleToGroupParams) {}
}
export class UpdateRoleInGroupResponseAction {
  readonly type = ActionType.UPDATE_ROLES_IN_GROUP
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: UpdateRoleInGroupRequestAction,
    public parent: CustomerDetails,
    public data: GroupDetails,
  ) {}
}
export class UpdateRoleInGroupErrorAction {
  readonly type = ActionType.UPDATE_ROLES_IN_GROUP
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: UpdateRoleInGroupRequestAction,
    public error: string,
  ) {}
}

export class UpdateUserInGroupRequestAction {
  readonly type = ActionType.UPDATE_USERS_IN_GROUP
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload: AddDeleteUserToGroupParams) {}
}
export class UpdateUserInGroupResponseAction {
  readonly type = ActionType.UPDATE_USERS_IN_GROUP
  readonly mode = AsyncActionMode.RESPONSE
  constructor(public request: UpdateUserInGroupRequestAction, public parent: CustomerDetails, public data: GroupDetails) {}
}
export class UpdateUserInGroupErrorAction {
  readonly type = ActionType.UPDATE_USERS_IN_GROUP
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: UpdateUserInGroupRequestAction,
    public error: string,
  ) {}
}

export class UserGroupRequestAction {
  readonly type = ActionType.USER_GROUP
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload?: {}) {
    ''
  }
}
export class UserGroupResponseAction {
  readonly type = ActionType.USER_GROUP
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: UserGroupRequestAction,
    public data: GroupDetails,
  ) {}
}
export class UserGroupErrorAction {
  readonly type = ActionType.USER_GROUP
  readonly mode = AsyncActionMode.ERROR
  constructor(public request: UserGroupRequestAction, public error: string) {}
}

export class CreateUserGroupRequestAction {
  readonly type = ActionType.CREATE_USER_GROUP
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload: CreateGroupParams) {}
}
export class CreateUserGroupResponseAction {
  readonly type = ActionType.CREATE_USER_GROUP
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: CreateUserGroupRequestAction,
    public parent: CustomerDetails,
    public data: GroupDetails
  ) {}
}
export class CreateUserGroupErrorAction {
  readonly type = ActionType.CREATE_USER_GROUP
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: CreateUserGroupRequestAction,
    public error: string,
  ) {}
}

export class GetUserGroupRequestAction {
  readonly type = ActionType.GET_USER_GROUP
  readonly mode = AsyncActionMode.REQUEST
  constructor() {
    ''
  }
}
export class GetUserGroupResponseAction {
  readonly type = ActionType.GET_USER_GROUP
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: GetUserGroupRequestAction,
    public data: GroupDetails,
  ) {}
}
export class GetUserGroupErrorAction {
  readonly type = ActionType.GET_USER_GROUP
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: GetUserGroupRequestAction,
    public error: string,
  ) {}
}

export class GetRootGroupRequestAction {
  readonly type = ActionType.GET_ROOT_GROUP
  readonly mode = AsyncActionMode.REQUEST
  constructor() {
    ''
  }
}

export class GetRootGroupResponseAction {
  readonly type = ActionType.GET_ROOT_GROUP
  readonly mode = AsyncActionMode.RESPONSE
  constructor(public request: GetRootGroupRequestAction, public data: GroupDetails) {
  }
}

export class GetRootGroupErrorAction {
  readonly type = ActionType.GET_ROOT_GROUP
  readonly mode = AsyncActionMode.ERROR
  constructor(public request: GetRootGroupRequestAction, public error: string) {
  }
}

export class GetUserGroupByParentRequestAction {
  readonly type = ActionType.GET_USER_GROUP_BY_PARENT
  readonly mode = AsyncActionMode.REQUEST
  constructor(public id: number) {
    ''
  }
}

export class GetUserGroupByParentResponseAction {
  readonly type = ActionType.GET_USER_GROUP_BY_PARENT
  readonly mode = AsyncActionMode.RESPONSE
  constructor(public request: GetUserGroupByParentRequestAction, public data: GroupDetails[]) {
  }
}

export class GetUserGroupByParentErrorAction {
  readonly type = ActionType.GET_USER_GROUP_BY_PARENT
  readonly mode = AsyncActionMode.ERROR
  constructor(public request: GetUserGroupByParentRequestAction, public error: string) {
  }
}

export class UpdateUserGroupRequestAction {
  readonly type = ActionType.UPDATE_USER_GROUP
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload: UpdateGroupParams) {}
}


export class UpdateUserGroupResponseAction {
  readonly type = ActionType.UPDATE_USER_GROUP
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: UpdateUserGroupRequestAction,
    public data: GroupDetails,
  ) {}
}
export class UpdateUserGroupErrorAction {
  readonly type = ActionType.UPDATE_USER_GROUP
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: UpdateUserGroupRequestAction,
    public error: string,
  ) {}
}

export class DeleteUserGroupRequestAction {
  readonly type = ActionType.DELETE_USER_GROUP
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload: DeleteGroupParams) {}
}
export class DeleteUserGroupResponseAction {
  readonly type = ActionType.DELETE_USER_GROUP
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: DeleteUserGroupRequestAction,
    public id: DeleteGroupParams,
    public data: GroupDetails,
  ) {}
}
export class DeleteUserGroupErrorAction {
  readonly type = ActionType.DELETE_USER_GROUP
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: DeleteUserGroupRequestAction,
    public error: string,
  ) {}
}
