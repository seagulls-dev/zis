import {UpdateTemplateRequestAction, UpdateTemplateResponseAction, UpdateTemplateErrorAction} from '.'
import {protectedApiClient} from 'helpers/api'
import {handleApiErrorWithNotification} from 'helpers/errorHandling'
import {TemplateDetails, UpdateTemplateParams} from '../models'

export default (params: UpdateTemplateParams, cb?: (isSuccess: boolean) => void) => {
	return (
		dispatch: (arg: UpdateTemplateRequestAction | UpdateTemplateResponseAction | UpdateTemplateErrorAction) => void,
	) => {
		const request = new UpdateTemplateRequestAction(params)
		dispatch(request)

		protectedApiClient
			.put<TemplateDetails>(`/web/template/update`, params)
			.then((response) => {
				dispatch(new UpdateTemplateResponseAction(request, response.data))
				cb && cb(true)
			})
			.catch((error) => {
				dispatch(new UpdateTemplateErrorAction(request, error))
				handleApiErrorWithNotification(error)
				cb && cb(false)
			})
	}
}
