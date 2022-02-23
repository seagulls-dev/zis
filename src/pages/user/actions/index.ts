import { AsyncActionMode } from 'common/models'
import { CreateUserParams, UpdateUserParams, ErrorUser, ProfileUserParams } from '../models'
import { UserDetails } from 'pages/user/models'

export enum ActionType {
  CREATE_USER = 'CREATE_USER',
  UPDATE_USER = 'UPDATE_USER',
  DELETE_USER = 'DELETE_USER',
  GET_USER = 'GET_USER',
  ALL_USERS = 'ALL_USERS',
  GET_USER_ROLES = 'GET_USER_ROLES',
  PROFILE_USER = 'PROFILE_USER'
}

export type UserActions =
  | CreateUserRequestAction
  | CreateUserResponseAction
  | CreateUserErrorAction
  | UpdateUserRequestAction
  | UpdateUserResponseAction
  | UpdateUserErrorAction
  | DeleteUserRequestAction
  | DeleteUserResponseAction
  | DeleteUserErrorAction
  | GetUserRequestAction
  | GetUserResponseAction
  | GetUserErrorAction
  | AllUsersRequestAction
  | AllUsersResponseAction
  | AllUsersErrorAction
  | UserRolesRequestAction
  | UserRolesResponseAction
  | UserRolesErrorAction
  | ProfileUserRequestAction
  | ProfileUserResponseAction
  | ProfileUserErrorAction

export class AllUsersRequestAction {
  readonly type = ActionType.ALL_USERS
  readonly mode = AsyncActionMode.REQUEST
  constructor() {
    ''
  }
}
export class AllUsersResponseAction {
  readonly type = ActionType.ALL_USERS
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: AllUsersRequestAction,
    public data: UserDetails[],
  ) {}
}
export class AllUsersErrorAction {
  readonly type = ActionType.ALL_USERS
  readonly mode = AsyncActionMode.ERROR
  constructor(public request: AllUsersRequestAction, public error: ErrorUser) {}
}

export class GetUserRequestAction {
  readonly type = ActionType.GET_USER
  readonly mode = AsyncActionMode.REQUEST
  constructor() {
    ''
  }
}
export class GetUserResponseAction {
  readonly type = ActionType.GET_USER
  readonly mode = AsyncActionMode.RESPONSE
  constructor(public request: GetUserRequestAction, public data: UserDetails) {}
}
export class GetUserErrorAction {
  readonly type = ActionType.GET_USER
  readonly mode = AsyncActionMode.ERROR
  constructor(public request: GetUserRequestAction, public error: ErrorUser) {
    ''
  }
}

export class CreateUserRequestAction {
  readonly type = ActionType.CREATE_USER
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload: CreateUserParams) {}
}
export class CreateUserResponseAction {
  readonly type = ActionType.CREATE_USER
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: CreateUserRequestAction,
    public data: UserDetails,
  ) {}
}
export class CreateUserErrorAction {
  readonly type = ActionType.CREATE_USER
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: CreateUserRequestAction,
    public error: ErrorUser,
  ) {}
}

export class UpdateUserRequestAction {
  readonly type = ActionType.UPDATE_USER
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload: UpdateUserParams) {}
}
export class UpdateUserResponseAction {
  readonly type = ActionType.UPDATE_USER
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: UpdateUserRequestAction,
    public data: UserDetails,
  ) {}
}
export class UpdateUserErrorAction {
  readonly type = ActionType.UPDATE_USER
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: UpdateUserRequestAction,
    public error: ErrorUser,
  ) {}
}

export class ProfileUserRequestAction {
  readonly type = ActionType.PROFILE_USER
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload: ProfileUserParams) {
  }
}

export class ProfileUserResponseAction {
  readonly type = ActionType.PROFILE_USER
  readonly mode = AsyncActionMode.RESPONSE
  constructor(public request: ProfileUserRequestAction, public data: UserDetails) {
  }
}

export class ProfileUserErrorAction {
  readonly type = ActionType.PROFILE_USER
  readonly mode = AsyncActionMode.ERROR
  constructor(public request: ProfileUserRequestAction, public error: ErrorUser) {
  }
}

export class DeleteUserRequestAction {
  readonly type = ActionType.DELETE_USER
  readonly mode = AsyncActionMode.REQUEST
  constructor() {
    ''
  }
}
export class DeleteUserResponseAction {
  readonly type = ActionType.DELETE_USER
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: DeleteUserRequestAction,
    public data: UserDetails,
  ) {}
}
export class DeleteUserErrorAction {
  readonly type = ActionType.DELETE_USER
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: DeleteUserRequestAction,
    public error: ErrorUser,
  ) {}
}

export class UserRolesRequestAction {
  readonly type = ActionType.GET_USER_ROLES
  readonly mode = AsyncActionMode.REQUEST
  constructor() {
    ''
  }
}

export class UserRolesResponseAction {
  readonly type = ActionType.GET_USER_ROLES
  readonly mode = AsyncActionMode.RESPONSE
  constructor(public request: UserRolesRequestAction, public data: string[]) {
  }
}

export class UserRolesErrorAction {
  readonly type = ActionType.GET_USER_ROLES
  readonly mode = AsyncActionMode.ERROR
  constructor(public request: UserRolesRequestAction, public error: ErrorUser) {
  }
}
