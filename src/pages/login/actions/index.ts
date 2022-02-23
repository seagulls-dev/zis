import { AsyncActionMode } from 'common/models'
import { UserDetails, ErrorUser } from 'pages/user/models'
import { LoginParams, AuthState } from '../models'

export enum ActionType {
  LOGIN_USER = 'LOGIN_USER',
  LOGOUT_USER = 'LOGOUT_USER',
  USER_DETAILS = 'USER_DETAILS',
  USER_SIGNED_OUT = 'USER_SIGNED_OUT',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  TRY_TO_LOAD_USER = 'TRY_TO_LOAD_USER',
  API_ERROR = 'API_ERROR',
  GET_MENU_ROLES = 'GET_MENU_ROLES'
}

export type LoginActions =
  | UserLoginRequestAction
  | UserLoginResponseAction
  | UserLoginErrorAction
  | UserLogoutRequestAction
  | UserLogoutResponseAction
  | UserLogoutErrorAction
  | TokenExpiredAction
  | UserDetailsRequestAction
  | UserDetailsResponseAction
  | UserDetailsErrorAction
  | TryToLoadUserRequestAction
  | TryToLoadUserResponseAction
  | TryToLoadUserErrorAction
  | GetMenuRolesRequestAction
  | GetMenuRolesResponseAction
  | GetMenuRolesErrorAction

export class TryToLoadUserRequestAction {
  readonly type = ActionType.TRY_TO_LOAD_USER
  readonly mode = AsyncActionMode.REQUEST
  constructor() {
    ''
  }
}
export class TryToLoadUserResponseAction {
  readonly type = ActionType.TRY_TO_LOAD_USER
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: TryToLoadUserRequestAction,
    public self: UserDetails,
  ) // public auth: AuthState,
  {}
}
export class TryToLoadUserErrorAction {
  readonly type = ActionType.TRY_TO_LOAD_USER
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: TryToLoadUserRequestAction,
    public error: ErrorUser,
  ) {}
}

export class UserDetailsRequestAction {
  readonly type = ActionType.USER_DETAILS
  readonly mode = AsyncActionMode.REQUEST
  constructor() {
    ''
  }
}
export class UserDetailsResponseAction {
  readonly type = ActionType.USER_DETAILS
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: UserDetailsRequestAction,
    public self: UserDetails,
  ) {}
}
export class UserDetailsErrorAction {
  readonly type = ActionType.USER_DETAILS
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: UserDetailsRequestAction,
    public error: ErrorUser,
  ) {}
}

export class GetMenuRolesRequestAction {
  readonly type = ActionType.GET_MENU_ROLES
  readonly mode = AsyncActionMode.REQUEST
  constructor() {
    ''
  }
}

export class GetMenuRolesResponseAction {
  readonly type = ActionType.GET_MENU_ROLES
  readonly mode = AsyncActionMode.RESPONSE
  constructor(public request: GetMenuRolesRequestAction, public menu_roles: any) {
  }
}

export class GetMenuRolesErrorAction {
  readonly type = ActionType.GET_MENU_ROLES
  readonly mode = AsyncActionMode.ERROR
  constructor(public request: GetMenuRolesRequestAction, public error: ErrorUser) {
  }
}

export class TokenExpiredAction {
  readonly type = ActionType.TOKEN_EXPIRED
  constructor() {
    ''
  }
}

export class UserLoginRequestAction {
  readonly type = ActionType.LOGIN_USER
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload: LoginParams) {}
}
export class UserLoginResponseAction {
  readonly type = ActionType.LOGIN_USER
  readonly mode = AsyncActionMode.RESPONSE
  constructor(public request: UserLoginRequestAction, public auth: AuthState) {}
}
export class UserLoginErrorAction {
  readonly type = ActionType.LOGIN_USER
  readonly mode = AsyncActionMode.ERROR
  constructor(public request: UserLoginRequestAction, public error: string) {}
}

export class UserLogoutRequestAction {
  readonly type = ActionType.LOGOUT_USER
  readonly mode = AsyncActionMode.REQUEST
  constructor() {
    ''
  }
}
export class UserLogoutResponseAction {
  readonly type = ActionType.LOGOUT_USER
  readonly mode = AsyncActionMode.RESPONSE
  constructor() {
    ''
  }
}
export class UserLogoutErrorAction {
  readonly type = ActionType.LOGOUT_USER
  readonly mode = AsyncActionMode.ERROR
  constructor(public request: UserLogoutRequestAction, public error: string) {}
}
