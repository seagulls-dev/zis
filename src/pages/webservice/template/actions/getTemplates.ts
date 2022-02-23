import {GetTemplatesRequestAction, GetTemplatesResponseAction, GetTemplatesErrorAction} from '.'
import {protectedApiClient} from 'helpers/api'
import {handleApiErrorWithNotification} from 'helpers/errorHandling'
import {TemplateDetails} from '../models'

export default (cb?: (isSuccess: boolean) => void) => {
	return (
		dispatch: (arg: GetTemplatesRequestAction | GetTemplatesResponseAction | GetTemplatesErrorAction) => void,
	) => {
		const request = new GetTemplatesRequestAction()
		dispatch(request)

		protectedApiClient
			.get<TemplateDetails[]>('/web/template/get-all')
			.then((response) => {
				dispatch(new GetTemplatesResponseAction(request, response.data))
				cb && cb(true)
			})
			.catch((error) => {
				dispatch(new GetTemplatesErrorAction(request, error))
				handleApiErrorWithNotification(error)
				cb && cb(false)
			})
	}
}
