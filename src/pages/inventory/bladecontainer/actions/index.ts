import { AsyncActionMode } from 'common/models'
import {
  CreateBladeContainerParams,
  BladeContainerDetails,
  BladeContainerError,
  UpdateBladeContainerParams,
  InsertBladeParams,
  MoveBladeParams,
  ReallocateBladeParams,
} from '../models'

export enum ActionType {
  CREATE_BLADECONTAINER = 'CREATE_BLADECONTAINER',
  GET_BLADECONTAINERS = 'GET_BLADECONTAINERS',
  GET_BLADECONTAINER = 'GET_BLADECONTAINER',
  UPDATE_BLADECONTAINER = 'UPDATE_BLADECONTAINER',
  DELETE_BLADECONTAINER = 'DELETE_BLADECONTAINER',
  INSERT_BLADE_TO_BLADECONTAINER = 'INSERT_BLADE_TO_BLADECONTAINER',
  MOVE_BLADE_IN_BLADECONTAINER = 'MOVE_BLADE_IN_BLADECONTAINER',
  REALLOCATE_BLADE_IN_BLADECONTAINER = 'REALLOCATE_BLADE_IN_BLADECONTAINER',
}

export type BladeContainerActions =
  | CreateBladeContainerRequestAction
  | CreateBladeContainerResponseAction
  | CreateBladeContainerErrorAction
  | GetBladeContainersRequestAction
  | GetBladeContainersResponseAction
  | GetBladeContainersErrorAction
  | GetBladeContainerRequestAction
  | GetBladeContainerResponseAction
  | GetBladeContainerErrorAction
  | UpdateBladeContainerRequestAction
  | UpdateBladeContainerResponseAction
  | UpdateBladeContainerErrorAction
  | DeleteBladeContainerRequestAction
  | DeleteBladeContainerResponseAction
  | DeleteBladeContainerErrorAction
  | InsertBladeToBladeContainerRequestAction
  | InsertBladeToBladeContainerResponseAction
  | InsertBladeToBladeContainerErrorAction
  | MoveBladeInBladeContainerRequestAction
  | MoveBladeInBladeContainerResponseAction
  | MoveBladeInBladeContainerErrorAction
  | ReallocateBladeInBladeContainerRequestAction
  | ReallocateBladeInBladeContainerResponseAction
  | ReallocateBladeInBladeContainerErrorAction

export class ReallocateBladeInBladeContainerRequestAction {
  readonly type = ActionType.REALLOCATE_BLADE_IN_BLADECONTAINER
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload: ReallocateBladeParams) {}
}
export class ReallocateBladeInBladeContainerResponseAction {
  readonly type = ActionType.REALLOCATE_BLADE_IN_BLADECONTAINER
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: ReallocateBladeInBladeContainerRequestAction,
    public data: BladeContainerDetails,
  ) {}
}
export class ReallocateBladeInBladeContainerErrorAction {
  readonly type = ActionType.REALLOCATE_BLADE_IN_BLADECONTAINER
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: ReallocateBladeInBladeContainerRequestAction,
    public error: BladeContainerError,
  ) {}
}

export class MoveBladeInBladeContainerRequestAction {
  readonly type = ActionType.MOVE_BLADE_IN_BLADECONTAINER
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload: MoveBladeParams) {}
}
export class MoveBladeInBladeContainerResponseAction {
  readonly type = ActionType.MOVE_BLADE_IN_BLADECONTAINER
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: MoveBladeInBladeContainerRequestAction,
    public data: BladeContainerDetails,
  ) {}
}
export class MoveBladeInBladeContainerErrorAction {
  readonly type = ActionType.MOVE_BLADE_IN_BLADECONTAINER
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: MoveBladeInBladeContainerRequestAction,
    public error: BladeContainerError,
  ) {}
}

export class InsertBladeToBladeContainerRequestAction {
  readonly type = ActionType.INSERT_BLADE_TO_BLADECONTAINER
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload: InsertBladeParams) {}
}
export class InsertBladeToBladeContainerResponseAction {
  readonly type = ActionType.INSERT_BLADE_TO_BLADECONTAINER
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: InsertBladeToBladeContainerRequestAction,
    public data: BladeContainerDetails,
  ) {}
}
export class InsertBladeToBladeContainerErrorAction {
  readonly type = ActionType.INSERT_BLADE_TO_BLADECONTAINER
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: InsertBladeToBladeContainerRequestAction,
    public error: BladeContainerError,
  ) {}
}

export class CreateBladeContainerRequestAction {
  readonly type = ActionType.CREATE_BLADECONTAINER
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload: CreateBladeContainerParams) {}
}
export class CreateBladeContainerResponseAction {
  readonly type = ActionType.CREATE_BLADECONTAINER
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: CreateBladeContainerRequestAction,
    public data: BladeContainerDetails,
  ) {}
}
export class CreateBladeContainerErrorAction {
  readonly type = ActionType.CREATE_BLADECONTAINER
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: CreateBladeContainerRequestAction,
    public error: BladeContainerError,
  ) {}
}

export class GetBladeContainerRequestAction {
  readonly type = ActionType.GET_BLADECONTAINER
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload: number) {
    ''
  }
}
export class GetBladeContainerResponseAction {
  readonly type = ActionType.GET_BLADECONTAINER
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: GetBladeContainerRequestAction,
    public data: BladeContainerDetails,
  ) {}
}
export class GetBladeContainerErrorAction {
  readonly type = ActionType.GET_BLADECONTAINER
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: GetBladeContainerRequestAction,
    public error: BladeContainerError,
  ) {}
}

export class GetBladeContainersRequestAction {
  readonly type = ActionType.GET_BLADECONTAINERS
  readonly mode = AsyncActionMode.REQUEST
  constructor() {
    ''
  }
}
export class GetBladeContainersResponseAction {
  readonly type = ActionType.GET_BLADECONTAINERS
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: GetBladeContainersRequestAction,
    public data: BladeContainerDetails[],
  ) {}
}
export class GetBladeContainersErrorAction {
  readonly type = ActionType.GET_BLADECONTAINERS
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: GetBladeContainersRequestAction,
    public error: BladeContainerError,
  ) {}
}

export class UpdateBladeContainerRequestAction {
  readonly type = ActionType.UPDATE_BLADECONTAINER
  readonly mode = AsyncActionMode.REQUEST
  constructor(public id: UpdateBladeContainerParams) {}
}
export class UpdateBladeContainerResponseAction {
  readonly type = ActionType.UPDATE_BLADECONTAINER
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: UpdateBladeContainerRequestAction,
    public data: BladeContainerDetails,
  ) {}
}
export class UpdateBladeContainerErrorAction {
  readonly type = ActionType.UPDATE_BLADECONTAINER
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: UpdateBladeContainerRequestAction,
    public error: BladeContainerError,
  ) {}
}

export class DeleteBladeContainerRequestAction {
  readonly type = ActionType.DELETE_BLADECONTAINER
  readonly mode = AsyncActionMode.REQUEST
  constructor(public id: number) {
    ''
  }
}
export class DeleteBladeContainerResponseAction {
  readonly type = ActionType.DELETE_BLADECONTAINER
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: DeleteBladeContainerRequestAction,
    public data: BladeContainerDetails,
  ) {}
}
export class DeleteBladeContainerErrorAction {
  readonly type = ActionType.DELETE_BLADECONTAINER
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: DeleteBladeContainerRequestAction,
    public error: BladeContainerError,
  ) {}
}
