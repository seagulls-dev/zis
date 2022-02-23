import { AsyncActionMode } from 'common/models'
import { ErrorSetting, UpdateSettingParams } from '../models'
import { SettingsDetails } from 'pages/settings/models'

export enum ActionType {
  GET_SETTING_SELF = 'GET_SETTING_SELF',
  UPDATE_SETTINGS = 'UPDATE_SETTINGS'
}

export type SettingAction =
  | GetSettingSelfRequestAction
  | GetSettingSelfResponseAction
  | GetSettingSelfErrorAction
  | UpdateSettingRequestAction
  | UpdateSettingResponseAction
  | UpdateSettingErrorAction

export class GetSettingSelfRequestAction {
  readonly type = ActionType.GET_SETTING_SELF
  readonly mode = AsyncActionMode.REQUEST
  constructor() {
    ''
  }
}

export class GetSettingSelfResponseAction {
  readonly type = ActionType.GET_SETTING_SELF
  readonly mode = AsyncActionMode.RESPONSE
  constructor(public request: GetSettingSelfRequestAction, public data: SettingsDetails[]) {
  }
}

export class GetSettingSelfErrorAction {
  readonly type = ActionType.GET_SETTING_SELF
  readonly mode = AsyncActionMode.ERROR
  constructor(public request: GetSettingSelfRequestAction, public error: ErrorSetting) {
  }
}

export class UpdateSettingRequestAction {
  readonly type = ActionType.UPDATE_SETTINGS
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload: UpdateSettingParams) {
  }
}

export class UpdateSettingResponseAction {
  readonly type = ActionType.UPDATE_SETTINGS
  readonly mode = AsyncActionMode.RESPONSE
  constructor(public request: UpdateSettingRequestAction, public data: SettingsDetails) {
  }
}

export class UpdateSettingErrorAction {
  readonly type = ActionType.UPDATE_SETTINGS
  readonly mode = AsyncActionMode.ERROR
  constructor(public request: UpdateSettingRequestAction, public error: ErrorSetting) {
  }
}
