import {GetAliasesRequestAction, GetAliasesResponseAction, GetAliasesErrorAction} from '.'
import {protectedApiClient} from 'helpers/api'
import {handleApiErrorWithNotification} from 'helpers/errorHandling'
import {AliasDetails} from '../models'

export default (vhost_id: number, cb?: (isSuccess: boolean) => void) => {
	return (dispatch: (arg: GetAliasesRequestAction | GetAliasesResponseAction | GetAliasesErrorAction) => void) => {
		const request = new GetAliasesRequestAction()
		dispatch(request)

		protectedApiClient
			.get<AliasDetails[]>(`/web/alias/get-all?vhost_id=${vhost_id}`)
			.then((response) => {
				dispatch(new GetAliasesResponseAction(request, response.data))
				cb && cb(true)
			})
			.catch((error) => {
				dispatch(new GetAliasesErrorAction(request, error))
				handleApiErrorWithNotification(error)
				cb && cb(false)
			})
	}
}
