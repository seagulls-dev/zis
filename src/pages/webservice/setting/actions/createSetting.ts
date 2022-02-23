import {CreateSettingRequestAction, CreateSettingResponseAction, CreateSettingErrorAction} from '.'
import {protectedApiClient} from 'helpers/api'
import {handleApiErrorWithNotification} from 'helpers/errorHandling'
import {CreateSettingParams, SettingDetails} from '../models'

export default (params: CreateSettingParams, cb?: (isSuccess: boolean) => void) => {
	return (
		dispatch: (arg: CreateSettingRequestAction | CreateSettingResponseAction | CreateSettingErrorAction) => void,
	) => {
		const request = new CreateSettingRequestAction(params)
		dispatch(request)
		protectedApiClient
			.post<SettingDetails>('/web/setting/create', params)
			.then((response) => {
				dispatch(new CreateSettingResponseAction(request, response.data))
				cb && cb(true)
			})
			.catch((error) => {
				dispatch(new CreateSettingErrorAction(request, error))
				handleApiErrorWithNotification(error)
				cb && cb(false)
			})
	}
}
