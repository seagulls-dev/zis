import { AsyncActionMode } from 'common/models'
import { BlockDetails, BlockError, BlockParams } from '../models'

export enum ActionType {
  CREATE_BLOCK = 'CREATE_BLOCK',
  GET_BLOCKS = 'GET_BLOCKS',
  GET_BLOCK = 'GET_BLOCK',
  UPDATE_BLOCK = 'UPDATE_BLOCK',
  DELETE_BLOCK = 'DELETE_BLOCK',
}

export type BlockActions =
  | CreateBlockRequestAction
  | CreateBlockResponseAction
  | CreateBlockErrorAction
  | GetBlocksRequestAction
  | GetBlocksResponseAction
  | GetBlocksErrorAction
  | GetBlockRequestAction
  | GetBlockResponseAction
  | GetBlockErrorAction
  | UpdateBlockRequestAction
  | UpdateBlockResponseAction
  | UpdateBlockErrorAction
  | DeleteBlockRequestAction
  | DeleteBlockResponseAction
  | DeleteBlockErrorAction

export class CreateBlockRequestAction {
  readonly type = ActionType.CREATE_BLOCK
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload: BlockParams) {}
}
export class CreateBlockResponseAction {
  readonly type = ActionType.CREATE_BLOCK
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: CreateBlockRequestAction,
    public data: BlockDetails,
  ) {}
}
export class CreateBlockErrorAction {
  readonly type = ActionType.CREATE_BLOCK
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: CreateBlockRequestAction,
    public error: BlockError,
  ) {}
}

export class GetBlockRequestAction {
  readonly type = ActionType.GET_BLOCK
  readonly mode = AsyncActionMode.REQUEST
  constructor(public id: number) {
    ''
  }
}
export class GetBlockResponseAction {
  readonly type = ActionType.GET_BLOCK
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: GetBlockRequestAction,
    public data: BlockDetails,
  ) {}
}
export class GetBlockErrorAction {
  readonly type = ActionType.GET_BLOCK
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: GetBlockRequestAction,
    public error: BlockError,
  ) {}
}

export class GetBlocksRequestAction {
  readonly type = ActionType.GET_BLOCKS
  readonly mode = AsyncActionMode.REQUEST
  constructor() {
    ''
  }
}
export class GetBlocksResponseAction {
  readonly type = ActionType.GET_BLOCKS
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: GetBlocksRequestAction,
    public data: BlockDetails[],
  ) {}
}
export class GetBlocksErrorAction {
  readonly type = ActionType.GET_BLOCKS
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: GetBlocksRequestAction,
    public error: BlockError,
  ) {}
}

export class UpdateBlockRequestAction {
  readonly type = ActionType.UPDATE_BLOCK
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload: BlockParams) {}
}
export class UpdateBlockResponseAction {
  readonly type = ActionType.UPDATE_BLOCK
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: UpdateBlockRequestAction,
    public data: BlockDetails,
  ) {}
}
export class UpdateBlockErrorAction {
  readonly type = ActionType.UPDATE_BLOCK
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: UpdateBlockRequestAction,
    public error: BlockError,
  ) {}
}

export class DeleteBlockRequestAction {
  readonly type = ActionType.DELETE_BLOCK
  readonly mode = AsyncActionMode.REQUEST
  constructor(public id: number) {
    ''
  }
}
export class DeleteBlockResponseAction {
  readonly type = ActionType.DELETE_BLOCK
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: DeleteBlockRequestAction,
    public data: BlockDetails,
  ) {}
}
export class DeleteBlockErrorAction {
  readonly type = ActionType.DELETE_BLOCK
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: DeleteBlockRequestAction,
    public error: BlockError,
  ) {}
}
