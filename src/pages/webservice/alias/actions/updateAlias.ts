import {UpdateAliasRequestAction, UpdateAliasResponseAction, UpdateAliasErrorAction} from '.'
import {protectedApiClient} from 'helpers/api'
import {handleApiErrorWithNotification} from 'helpers/errorHandling'
import {AliasDetails, UpdateAliasParams} from '../models'

export default (params: UpdateAliasParams, cb?: (isSuccess: boolean) => void) => {
	return (dispatch: (arg: UpdateAliasRequestAction | UpdateAliasResponseAction | UpdateAliasErrorAction) => void) => {
		const request = new UpdateAliasRequestAction(params)
		dispatch(request)

		protectedApiClient
			.put<AliasDetails>(`/web/alias/update`, params)
			.then((response) => {
				dispatch(new UpdateAliasResponseAction(request, response.data))
				cb && cb(true)
			})
			.catch((error) => {
				dispatch(new UpdateAliasErrorAction(request, error))
				handleApiErrorWithNotification(error)
				cb && cb(false)
			})
	}
}
