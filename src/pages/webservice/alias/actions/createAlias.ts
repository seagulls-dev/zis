import {CreateAliasRequestAction, CreateAliasResponseAction, CreateAliasErrorAction} from '.'
import {protectedApiClient} from 'helpers/api'
import {handleApiErrorWithNotification} from 'helpers/errorHandling'
import {CreateAliasParams, AliasDetails} from '../models'

export default (params: CreateAliasParams, cb?: (isSuccess: boolean) => void) => {
	return (dispatch: (arg: CreateAliasRequestAction | CreateAliasResponseAction | CreateAliasErrorAction) => void) => {
		const request = new CreateAliasRequestAction(params)
		dispatch(request)
		protectedApiClient
			.post<AliasDetails>('/web/alias/create', params)
			.then((response) => {
				dispatch(new CreateAliasResponseAction(request, response.data))
				cb && cb(true)
			})
			.catch((error) => {
				dispatch(new CreateAliasErrorAction(request, error))
				handleApiErrorWithNotification(error)
				cb && cb(false)
			})
	}
}
