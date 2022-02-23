import { AsyncActionMode } from 'common/models'
import { RackDetails, RackError, RackParams } from '../models'

export enum ActionType {
  CREATE_RACK = 'CREATE_RACK',
  GET_RACKS = 'GET_RACKS',
  GET_RACK = 'GET_RACK',
  GET_RACK_MEASURES = 'GET_RACK_MEASURES',
  UPDATE_RACK = 'UPDATE_RACK',
  DELETE_RACK = 'DELETE_RACK',
}

export type RackActions =
  | GetMeasuresRackRequestAction
  | GetMeasuresRackResponseAction
  | GetMeasuresRackErrorAction
  | CreateRackRequestAction
  | CreateRackResponseAction
  | CreateRackErrorAction
  | GetRacksRequestAction
  | GetRacksResponseAction
  | GetRacksErrorAction
  | GetRackRequestAction
  | GetRackResponseAction
  | GetRackErrorAction
  | UpdateRackRequestAction
  | UpdateRackResponseAction
  | UpdateRackErrorAction
  | DeleteRackRequestAction
  | DeleteRackResponseAction
  | DeleteRackErrorAction

export class GetMeasuresRackRequestAction {
  readonly type = ActionType.GET_RACK_MEASURES
  readonly mode = AsyncActionMode.REQUEST
  constructor(public rack_id: number) {
    ''
  }
}
export class GetMeasuresRackResponseAction {
  readonly type = ActionType.GET_RACK_MEASURES
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: GetMeasuresRackRequestAction,
    public data: RackDetails,
  ) {}
}
export class GetMeasuresRackErrorAction {
  readonly type = ActionType.GET_RACK_MEASURES
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: GetMeasuresRackRequestAction,
    public error: RackError,
  ) {}
}

export class CreateRackRequestAction {
  readonly type = ActionType.CREATE_RACK
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload: RackParams) {}
}
export class CreateRackResponseAction {
  readonly type = ActionType.CREATE_RACK
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: CreateRackRequestAction,
    public data: RackDetails,
  ) {}
}
export class CreateRackErrorAction {
  readonly type = ActionType.CREATE_RACK
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: CreateRackRequestAction,
    public error: RackError,
  ) {}
}

export class GetRackRequestAction {
  readonly type = ActionType.GET_RACK
  readonly mode = AsyncActionMode.REQUEST
  constructor(public id: number) {
    ''
  }
}
export class GetRackResponseAction {
  readonly type = ActionType.GET_RACK
  readonly mode = AsyncActionMode.RESPONSE
  constructor(public request: GetRackRequestAction, public data: RackDetails) {}
}
export class GetRackErrorAction {
  readonly type = ActionType.GET_RACK
  readonly mode = AsyncActionMode.ERROR
  constructor(public request: GetRackRequestAction, public error: RackError) {}
}

export class GetRacksRequestAction {
  readonly type = ActionType.GET_RACKS
  readonly mode = AsyncActionMode.REQUEST
  constructor() {
    ''
  }
}
export class GetRacksResponseAction {
  readonly type = ActionType.GET_RACKS
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: GetRacksRequestAction,
    public data: RackDetails[],
  ) {}
}
export class GetRacksErrorAction {
  readonly type = ActionType.GET_RACKS
  readonly mode = AsyncActionMode.ERROR
  constructor(public request: GetRacksRequestAction, public error: RackError) {}
}

export class UpdateRackRequestAction {
  readonly type = ActionType.UPDATE_RACK
  readonly mode = AsyncActionMode.REQUEST
  constructor(public id: RackParams) {}
}
export class UpdateRackResponseAction {
  readonly type = ActionType.UPDATE_RACK
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: UpdateRackRequestAction,
    public data: RackDetails,
  ) {}
}
export class UpdateRackErrorAction {
  readonly type = ActionType.UPDATE_RACK
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: UpdateRackRequestAction,
    public error: RackError,
  ) {}
}

export class DeleteRackRequestAction {
  readonly type = ActionType.DELETE_RACK
  readonly mode = AsyncActionMode.REQUEST
  constructor(public id: number) {
    ''
  }
}
export class DeleteRackResponseAction {
  readonly type = ActionType.DELETE_RACK
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: DeleteRackRequestAction,
    public data: RackDetails,
  ) {}
}
export class DeleteRackErrorAction {
  readonly type = ActionType.DELETE_RACK
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: DeleteRackRequestAction,
    public error: RackError,
  ) {}
}
