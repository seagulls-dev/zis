import { FontSize } from '../models'

export enum ActionType {
  CHANGE_FONT_SIZE = 'CHANGE_FONT_SIZE',
  RESET_FONT_SIZE = 'RESET_FONT_SIZE',
}

export type FontActions = SetFontAction | ResetFontAction

export class SetFontAction {
  readonly type = ActionType.CHANGE_FONT_SIZE
  constructor(public payload: FontSize) {}
}

export class ResetFontAction {
  readonly type = ActionType.RESET_FONT_SIZE
}
