import {combineReducers} from 'redux'
import {VhostState} from './vhost/models'
import {AliasState} from './alias/models'
import {SettingState} from './setting/models'
import {TemplateState} from './template/models'
import vhostReducer from './vhost/reducer'
import aliasRedicer from './alias/reducer'
import settingReducer from './setting/reducer'
import templateReducer from './template/reducer'

export interface WebService {
	vhost: VhostState
	alias: AliasState
	setting: SettingState
	template: TemplateState
}

export default combineReducers<WebService>({
	vhost: vhostReducer,
	alias: aliasRedicer,
	setting: settingReducer,
	template: templateReducer,
})
