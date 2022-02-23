import { AsyncActionMode } from 'common/models';
import { ChangePasswordState, ChangePasswordParams } from '../models';

export enum ActionType {
  CHANGE_PASSWORD = 'CHANGE_PASSWORD',
}

export type LoginAction =
  | ChangePasswordRequestAction
  | ChangePasswordResponseAction
  | ChangePasswordErrorAction;

export class ChangePasswordRequestAction {
  readonly type = ActionType.CHANGE_PASSWORD;
  readonly mode = AsyncActionMode.REQUEST;
  constructor(public payload: ChangePasswordParams) {}
}
export class ChangePasswordResponseAction {
  readonly type = ActionType.CHANGE_PASSWORD;
  readonly mode = AsyncActionMode.RESPONSE;
  constructor(
    public request: ChangePasswordRequestAction,
    public data: ChangePasswordState
  ) {}
}
export class ChangePasswordErrorAction {
  readonly type = ActionType.CHANGE_PASSWORD;
  readonly mode = AsyncActionMode.ERROR;
  constructor(
    public request: ChangePasswordRequestAction,
    public error: string
  ) {}
}
