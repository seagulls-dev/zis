import { RightSiderState } from '../models'

export enum ActionType {
  SET_SIDEBAR = 'SET_SIDEBAR',
}

export type RightSiderActions = SetSiderAction

export class SetSiderAction {
  readonly type = ActionType.SET_SIDEBAR
  constructor(public payload: RightSiderState) {}
}
