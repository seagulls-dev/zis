import {DeleteTemplateRequestAction, DeleteTemplateResponseAction, DeleteTemplateErrorAction} from '.'
import {protectedApiClient} from 'helpers/api'
import {handleApiErrorWithNotification} from 'helpers/errorHandling'

export default (id: number, cb?: (isSuccess: boolean) => void) => {
	return (
		dispatch: (arg: DeleteTemplateRequestAction | DeleteTemplateResponseAction | DeleteTemplateErrorAction) => void,
	) => {
		const request = new DeleteTemplateRequestAction(id)
		dispatch(request)

		protectedApiClient
			.delete(`/web/template/delete?id=${id}`)
			.then((response) => {
				dispatch(new DeleteTemplateResponseAction(request, response.data))
				cb && cb(true)
			})
			.catch((error) => {
				dispatch(new DeleteTemplateErrorAction(request, error))
				handleApiErrorWithNotification(error)
				cb && cb(false)
			})
	}
}
