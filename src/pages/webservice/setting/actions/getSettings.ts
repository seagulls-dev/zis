import {GetSettingsRequestAction, GetSettingsResponseAction, GetSettingsErrorAction} from '.'
import {protectedApiClient} from 'helpers/api'
import {handleApiErrorWithNotification} from 'helpers/errorHandling'
import {SettingDetails} from '../models'

export default (vhost_id: number, cb?: (isSuccess: boolean) => void) => {
	return (dispatch: (arg: GetSettingsRequestAction | GetSettingsResponseAction | GetSettingsErrorAction) => void) => {
		const request = new GetSettingsRequestAction()
		dispatch(request)

		protectedApiClient
			.get<SettingDetails[]>(`/web/setting/get-all?vhost_id=${vhost_id}`)
			.then((response) => {
				dispatch(new GetSettingsResponseAction(request, response.data))
				cb && cb(true)
			})
			.catch((error) => {
				dispatch(new GetSettingsErrorAction(request, error))
				handleApiErrorWithNotification(error)
				cb && cb(false)
			})
	}
}
