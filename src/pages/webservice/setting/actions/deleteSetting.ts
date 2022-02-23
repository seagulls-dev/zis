import {DeleteSettingRequestAction, DeleteSettingResponseAction, DeleteSettingErrorAction} from '.'
import {protectedApiClient} from 'helpers/api'
import {handleApiErrorWithNotification} from 'helpers/errorHandling'

export default (id: number, cb?: (isSuccess: boolean) => void) => {
	return (
		dispatch: (arg: DeleteSettingRequestAction | DeleteSettingResponseAction | DeleteSettingErrorAction) => void,
	) => {
		const request = new DeleteSettingRequestAction(id)
		dispatch(request)

		protectedApiClient
			.delete(`/web/setting/delete?id=${id}`)
			.then((response) => {
				dispatch(new DeleteSettingResponseAction(request, response.data))
				cb && cb(true)
			})
			.catch((error) => {
				dispatch(new DeleteSettingErrorAction(request, error))
				handleApiErrorWithNotification(error)
				cb && cb(false)
			})
	}
}
