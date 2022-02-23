import {CreateTemplateRequestAction, CreateTemplateResponseAction, CreateTemplateErrorAction} from '.'
import {protectedApiClient} from 'helpers/api'
import {handleApiErrorWithNotification} from 'helpers/errorHandling'
import {CreateTemplateParams, TemplateDetails} from '../models'

export default (params: CreateTemplateParams, cb?: (isSuccess: boolean) => void) => {
	return (
		dispatch: (arg: CreateTemplateRequestAction | CreateTemplateResponseAction | CreateTemplateErrorAction) => void,
	) => {
		const request = new CreateTemplateRequestAction(params)
		dispatch(request)
		protectedApiClient
			.post<TemplateDetails>('/web/template/create', params)
			.then((response) => {
				dispatch(new CreateTemplateResponseAction(request, response.data))
				cb && cb(true)
			})
			.catch((error) => {
				dispatch(new CreateTemplateErrorAction(request, error))
				handleApiErrorWithNotification(error)
				cb && cb(false)
			})
	}
}
