import { AsyncActionMode } from 'common/models'
import {
  CreateDataCenterParams,
  DataCenterDetails,
  DataCenterError,
  UpdateDataCenterParams,
} from '../models'

export enum ActionType {
  CREATE_DATACENTER = 'CREATE_DATACENTER',
  GET_DATACENTERS = 'GET_DATACENTERS',
  GET_DATACENTER = 'GET_DATACENTER',
  GET_DATACENTER_MEASURES = 'GET_DATACENTER_MEASURES',
  UPDATE_DATACENTER = 'UPDATE_DATACENTER',
  DELETE_DATACENTER = 'DELETE_DATACENTER',
}

export type DataCenterActions =
  | GetMeasuresDataCenterRequestAction
  | GetMeasuresDataCenterResponseAction
  | GetMeasuresDataCenterErrorAction
  | CreateDataCenterRequestAction
  | CreateDataCenterResponseAction
  | CreateDataCenterErrorAction
  | GetDataCentersRequestAction
  | GetDataCentersResponseAction
  | GetDataCentersErrorAction
  | GetDataCenterRequestAction
  | GetDataCenterResponseAction
  | GetDataCenterErrorAction
  | UpdateDataCenterRequestAction
  | UpdateDataCenterResponseAction
  | UpdateDataCenterErrorAction
  | DeleteDataCenterRequestAction
  | DeleteDataCenterResponseAction
  | DeleteDataCenterErrorAction

export class GetMeasuresDataCenterRequestAction {
  readonly type = ActionType.GET_DATACENTER_MEASURES
  readonly mode = AsyncActionMode.REQUEST
  constructor(public datacenter_id: number) {
    ''
  }
}
export class GetMeasuresDataCenterResponseAction {
  readonly type = ActionType.GET_DATACENTER_MEASURES
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: GetMeasuresDataCenterRequestAction,
    public data: DataCenterDetails,
  ) {}
}
export class GetMeasuresDataCenterErrorAction {
  readonly type = ActionType.GET_DATACENTER_MEASURES
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: GetMeasuresDataCenterRequestAction,
    public error: DataCenterError,
  ) {}
}

export class CreateDataCenterRequestAction {
  readonly type = ActionType.CREATE_DATACENTER
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload: CreateDataCenterParams) {}
}
export class CreateDataCenterResponseAction {
  readonly type = ActionType.CREATE_DATACENTER
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: CreateDataCenterRequestAction,
    public data: DataCenterDetails,
  ) {}
}
export class CreateDataCenterErrorAction {
  readonly type = ActionType.CREATE_DATACENTER
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: CreateDataCenterRequestAction,
    public error: DataCenterError,
  ) {}
}

export class GetDataCenterRequestAction {
  readonly type = ActionType.GET_DATACENTER
  readonly mode = AsyncActionMode.REQUEST
  constructor(public id: number) {
    ''
  }
}
export class GetDataCenterResponseAction {
  readonly type = ActionType.GET_DATACENTER
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: GetDataCenterRequestAction,
    public data: DataCenterDetails,
  ) {}
}
export class GetDataCenterErrorAction {
  readonly type = ActionType.GET_DATACENTER
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: GetDataCenterRequestAction,
    public error: DataCenterError,
  ) {}
}

export class GetDataCentersRequestAction {
  readonly type = ActionType.GET_DATACENTERS
  readonly mode = AsyncActionMode.REQUEST
  constructor() {
    ''
  }
}
export class GetDataCentersResponseAction {
  readonly type = ActionType.GET_DATACENTERS
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: GetDataCentersRequestAction,
    public data: DataCenterDetails[],
  ) {}
}
export class GetDataCentersErrorAction {
  readonly type = ActionType.GET_DATACENTERS
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: GetDataCentersRequestAction,
    public error: DataCenterError,
  ) {}
}

export class UpdateDataCenterRequestAction {
  readonly type = ActionType.UPDATE_DATACENTER
  readonly mode = AsyncActionMode.REQUEST
  constructor(public id: UpdateDataCenterParams) {}
}
export class UpdateDataCenterResponseAction {
  readonly type = ActionType.UPDATE_DATACENTER
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: UpdateDataCenterRequestAction,
    public data: DataCenterDetails,
  ) {}
}
export class UpdateDataCenterErrorAction {
  readonly type = ActionType.UPDATE_DATACENTER
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: UpdateDataCenterRequestAction,
    public error: DataCenterError,
  ) {}
}

export class DeleteDataCenterRequestAction {
  readonly type = ActionType.DELETE_DATACENTER
  readonly mode = AsyncActionMode.REQUEST
  constructor(public id: number) {
    ''
  }
}
export class DeleteDataCenterResponseAction {
  readonly type = ActionType.DELETE_DATACENTER
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: DeleteDataCenterRequestAction,
    public data: DataCenterDetails,
  ) {}
}
export class DeleteDataCenterErrorAction {
  readonly type = ActionType.DELETE_DATACENTER
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: DeleteDataCenterRequestAction,
    public error: DataCenterError,
  ) {}
}
