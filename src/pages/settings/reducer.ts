import {ActionType, SettingAction} from './actions'
import {AsyncActionMode} from 'common/models'
import {SettingsState} from './models'

const INITIAL_STATE: SettingsState = {
  isLoading: false,
  setting: undefined,
  error: undefined,
  settings: undefined
}

export default (state: SettingsState = INITIAL_STATE, action: SettingAction): SettingsState => {
  switch (action.type) {
    case ActionType.GET_SETTING_SELF:
      if (action.mode === AsyncActionMode.REQUEST) {
        return {...state, isLoading: true}
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state,
          isLoading: false,
          settings: action.data
        }
      }
      if (action.mode === AsyncActionMode.ERROR) {
        return {
          ...state,
          isLoading: false,
          setting: undefined
        }
      }
      break
    case ActionType.UPDATE_SETTINGS:
      if (action.mode === AsyncActionMode.REQUEST) {
        return {...state, isLoading: true}
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state,
          isLoading: false,
          settings: state.settings!.map(setting =>
            setting.id === action.data.id ? {...action.data} : setting
          )
        }
      }
      if (action.mode === AsyncActionMode.ERROR) {
        return {
          ...state,
          isLoading: false,
          error: action.error
        }
      }
  }
  return state
}
