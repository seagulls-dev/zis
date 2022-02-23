import { AsyncActionMode } from 'common/models'
import { InventoryDetails } from 'pages/inventory/inventory/models'
import {
  CreatePhysicalServerParams,
  PhysicalServerDetails,
  PhysicalServerError,
  UpdatePhysicalServerParams,
  PhysicalServerAddComponentParams,
  PhysicalServerRemoveComponentParams,
  PhysicalServerSwapComponentParams,
  MovePhysicalServerParams,
  PhysicalServerSetRackParams,
  PhysicalServerRemoveFromRackParams,
} from '../models'

export enum ActionType {
  CREATE_PHYSICALSERVER = 'CREATE_PHYSICALSERVER',
  GET_PHYSICALSERVERS = 'GET_PHYSICALSERVERS',
  GET_PHYSICALSERVER = 'GET_PHYSICALSERVER',
  UPDATE_PHYSICALSERVER = 'UPDATE_PHYSICALSERVER',
  MOVE_PHYSICALSERVER = 'MOVE_PHYSICALSERVER',
  ADD_COMPONENT_TO_PHYSICALSERVER = 'ADD_COMPONENT_TO_PHYSICALSERVER',
  REMOVE_COMPONENT_FROM_PHYSICALSERVER = 'REMOVE_COMPONENT_FROM_PHYSICALSERVER',
  SWAP_COMPONENT_IN_PHYSICALSERVER = 'SWAP_COMPONENT_IN_PHYSICALSERVER',
  REMOVE_PHYSICALSERVER_FROM_RACK = 'REMOVE_PHYSICALSERVER_FROM_RACK',
  SET_PHYSICALSERVER_RACK = 'SET_PHYSICALSERVER_RACK',
}

export type PhysicalServerActions =
  | CreatePhysicalServerRequestAction
  | CreatePhysicalServerResponseAction
  | CreatePhysicalServerErrorAction
  | GetPhysicalServersRequestAction
  | GetPhysicalServersResponseAction
  | GetPhysicalServersErrorAction
  | GetPhysicalServerRequestAction
  | GetPhysicalServerResponseAction
  | GetPhysicalServerErrorAction
  | UpdatePhysicalServerRequestAction
  | UpdatePhysicalServerResponseAction
  | UpdatePhysicalServerErrorAction
  | MovePhysicalServerRequestAction
  | MovePhysicalServerResponseAction
  | MovePhysicalServerErrorAction
  | AddComponentToPhysicalServerRequestAction
  | AddComponentToPhysicalServerResponseAction
  | AddComponentToPhysicalServerErrorAction
  | RemoveComponentFromPhysicalServerRequestAction
  | RemoveComponentFromPhysicalServerResponseAction
  | RemoveComponentFromPhysicalServerErrorAction
  | SwapComponentToPhysicalServerRequestAction
  | SwapComponentToPhysicalServerResponseAction
  | SwapComponentToPhysicalServerErrorAction
  | RemovePhysicalServerFromRackRequestAction
  | RemovePhysicalServerFromRackResponseAction
  | RemovePhysicalServerFromRackErrorAction
  | SetPhysicalServerRackRequestAction
  | SetPhysicalServerRackRackResponseAction
  | SetPhysicalServerRackRackErrorAction

export class SetPhysicalServerRackRequestAction {
  readonly type = ActionType.SET_PHYSICALSERVER_RACK
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload: PhysicalServerSetRackParams) {
    ''
  }
}
export class SetPhysicalServerRackRackResponseAction {
  readonly type = ActionType.SET_PHYSICALSERVER_RACK
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: SetPhysicalServerRackRequestAction,
    public data: PhysicalServerDetails,
  ) {}
}
export class SetPhysicalServerRackRackErrorAction {
  readonly type = ActionType.SET_PHYSICALSERVER_RACK
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: SetPhysicalServerRackRequestAction,
    public error: PhysicalServerError,
  ) {}
}

export class RemovePhysicalServerFromRackRequestAction {
  readonly type = ActionType.REMOVE_PHYSICALSERVER_FROM_RACK
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload: PhysicalServerRemoveFromRackParams) {
    ''
  }
}
export class RemovePhysicalServerFromRackResponseAction {
  readonly type = ActionType.REMOVE_PHYSICALSERVER_FROM_RACK
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: RemovePhysicalServerFromRackRequestAction,
    public data: PhysicalServerDetails,
  ) {}
}
export class RemovePhysicalServerFromRackErrorAction {
  readonly type = ActionType.REMOVE_PHYSICALSERVER_FROM_RACK
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: RemovePhysicalServerFromRackRequestAction,
    public error: PhysicalServerError,
  ) {}
}

export class SwapComponentToPhysicalServerRequestAction {
  readonly type = ActionType.SWAP_COMPONENT_IN_PHYSICALSERVER
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload: PhysicalServerSwapComponentParams) {
    ''
  }
}
export class SwapComponentToPhysicalServerResponseAction {
  readonly type = ActionType.SWAP_COMPONENT_IN_PHYSICALSERVER
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: SwapComponentToPhysicalServerRequestAction,
    public data: InventoryDetails,
  ) {}
}
export class SwapComponentToPhysicalServerErrorAction {
  readonly type = ActionType.SWAP_COMPONENT_IN_PHYSICALSERVER
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: SwapComponentToPhysicalServerRequestAction,
    public error: PhysicalServerError,
  ) {}
}

export class RemoveComponentFromPhysicalServerRequestAction {
  readonly type = ActionType.REMOVE_COMPONENT_FROM_PHYSICALSERVER
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload: PhysicalServerRemoveComponentParams) {
    ''
  }
}
export class RemoveComponentFromPhysicalServerResponseAction {
  readonly type = ActionType.REMOVE_COMPONENT_FROM_PHYSICALSERVER
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: RemoveComponentFromPhysicalServerRequestAction,
    public data: PhysicalServerDetails,
  ) {}
}
export class RemoveComponentFromPhysicalServerErrorAction {
  readonly type = ActionType.REMOVE_COMPONENT_FROM_PHYSICALSERVER
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: RemoveComponentFromPhysicalServerRequestAction,
    public error: PhysicalServerError,
  ) {}
}

export class AddComponentToPhysicalServerRequestAction {
  readonly type = ActionType.ADD_COMPONENT_TO_PHYSICALSERVER
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload: PhysicalServerAddComponentParams) {}
}
export class AddComponentToPhysicalServerResponseAction {
  readonly type = ActionType.ADD_COMPONENT_TO_PHYSICALSERVER
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: AddComponentToPhysicalServerRequestAction,
    public data: PhysicalServerDetails,
  ) {}
}
export class AddComponentToPhysicalServerErrorAction {
  readonly type = ActionType.ADD_COMPONENT_TO_PHYSICALSERVER
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: AddComponentToPhysicalServerRequestAction,
    public error: PhysicalServerError,
  ) {}
}

export class CreatePhysicalServerRequestAction {
  readonly type = ActionType.CREATE_PHYSICALSERVER
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload: CreatePhysicalServerParams) {}
}
export class CreatePhysicalServerResponseAction {
  readonly type = ActionType.CREATE_PHYSICALSERVER
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: CreatePhysicalServerRequestAction,
    public data: PhysicalServerDetails,
  ) {}
}
export class CreatePhysicalServerErrorAction {
  readonly type = ActionType.CREATE_PHYSICALSERVER
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: CreatePhysicalServerRequestAction,
    public error: PhysicalServerError,
  ) {}
}

export class GetPhysicalServerRequestAction {
  readonly type = ActionType.GET_PHYSICALSERVER
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload: number) {
    ''
  }
}
export class GetPhysicalServerResponseAction {
  readonly type = ActionType.GET_PHYSICALSERVER
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: GetPhysicalServerRequestAction,
    public data: PhysicalServerDetails,
  ) {}
}
export class GetPhysicalServerErrorAction {
  readonly type = ActionType.GET_PHYSICALSERVER
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: GetPhysicalServerRequestAction,
    public error: PhysicalServerError,
  ) {}
}

export class GetPhysicalServersRequestAction {
  readonly type = ActionType.GET_PHYSICALSERVERS
  readonly mode = AsyncActionMode.REQUEST
  constructor() {
    ''
  }
}
export class GetPhysicalServersResponseAction {
  readonly type = ActionType.GET_PHYSICALSERVERS
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: GetPhysicalServersRequestAction,
    public data: PhysicalServerDetails[],
  ) {}
}
export class GetPhysicalServersErrorAction {
  readonly type = ActionType.GET_PHYSICALSERVERS
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: GetPhysicalServersRequestAction,
    public error: PhysicalServerError,
  ) {}
}

export class UpdatePhysicalServerRequestAction {
  readonly type = ActionType.UPDATE_PHYSICALSERVER
  readonly mode = AsyncActionMode.REQUEST
  constructor(public id: UpdatePhysicalServerParams) {}
}
export class UpdatePhysicalServerResponseAction {
  readonly type = ActionType.UPDATE_PHYSICALSERVER
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: UpdatePhysicalServerRequestAction,
    public data: PhysicalServerDetails,
  ) {}
}
export class UpdatePhysicalServerErrorAction {
  readonly type = ActionType.UPDATE_PHYSICALSERVER
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: UpdatePhysicalServerRequestAction,
    public error: PhysicalServerError,
  ) {}
}

export class MovePhysicalServerRequestAction {
  readonly type = ActionType.MOVE_PHYSICALSERVER
  readonly mode = AsyncActionMode.REQUEST
  constructor(public params: MovePhysicalServerParams) {
    ''
  }
}
export class MovePhysicalServerResponseAction {
  readonly type = ActionType.MOVE_PHYSICALSERVER
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: MovePhysicalServerRequestAction,
    public data: PhysicalServerDetails,
  ) {}
}
export class MovePhysicalServerErrorAction {
  readonly type = ActionType.MOVE_PHYSICALSERVER
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: MovePhysicalServerRequestAction,
    public error: PhysicalServerError,
  ) {}
}
