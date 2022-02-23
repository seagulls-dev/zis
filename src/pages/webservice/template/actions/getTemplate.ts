import {GetTemplateRequestAction, GetTemplateResponseAction, GetTemplateErrorAction} from '.'
import {protectedApiClient} from 'helpers/api'
import {handleApiErrorWithNotification} from 'helpers/errorHandling'
import {TemplateDetails} from '../models'

export default (id: number, cb?: (isSuccess: boolean) => void) => {
	return (dispatch: (arg: GetTemplateRequestAction | GetTemplateResponseAction | GetTemplateErrorAction) => void) => {
		const request = new GetTemplateRequestAction(id)
		dispatch(request)

		protectedApiClient
			.get<TemplateDetails>(`/web/template/get?id=${id}`)
			.then((response) => {
				dispatch(new GetTemplateResponseAction(request, response.data))
				cb && cb(true)
			})
			.catch((error) => {
				dispatch(new GetTemplateErrorAction(request, error))
				handleApiErrorWithNotification(error)
				cb && cb(false)
			})
	}
}
