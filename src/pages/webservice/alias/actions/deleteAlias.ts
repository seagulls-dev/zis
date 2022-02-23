import {DeleteAliasRequestAction, DeleteAliasResponseAction, DeleteAliasErrorAction} from '.'
import {protectedApiClient} from 'helpers/api'
import {handleApiErrorWithNotification} from 'helpers/errorHandling'

export default (id: number, cb?: (isSuccess: boolean) => void) => {
	return (dispatch: (arg: DeleteAliasRequestAction | DeleteAliasResponseAction | DeleteAliasErrorAction) => void) => {
		const request = new DeleteAliasRequestAction(id)
		dispatch(request)

		protectedApiClient
			.delete(`/web/alias/delete?id=${id}`)
			.then((response) => {
				dispatch(new DeleteAliasResponseAction(request, response.data))
				cb && cb(true)
			})
			.catch((error) => {
				dispatch(new DeleteAliasErrorAction(request, error))
				handleApiErrorWithNotification(error)
				cb && cb(false)
			})
	}
}
