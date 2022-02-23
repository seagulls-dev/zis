import { Theme } from '../models';

export enum ActionType {
  CHANGE_THEME = 'CHANGE_THEME',
  RESET_THEME = 'RESET_THEME',
}

export type ThemeActions = SetThemeAction | ResetThemeAction;

export class SetThemeAction {
  readonly type = ActionType.CHANGE_THEME;
  constructor(public payload: Theme) {}
}

export class ResetThemeAction {
  readonly type = ActionType.RESET_THEME;
}
