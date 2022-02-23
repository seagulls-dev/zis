import {CreateTaxRequestAction, CreateTaxResponseAction, CreateTaxErrorAction} from '.'
import {protectedApiClient} from 'helpers/api'
import {handleApiErrorWithNotification} from 'helpers/errorHandling'
import {CreateTaxParams, TaxDetails} from '../models'

export default (params: CreateTaxParams, cb?: (isSuccess: boolean) => void) => {
	return (dispatch: (arg: CreateTaxRequestAction | CreateTaxResponseAction | CreateTaxErrorAction) => void) => {
		const request = new CreateTaxRequestAction(params)
		dispatch(request)
		protectedApiClient
			.post<TaxDetails>('/billing/tax/create', params)
			.then((response) => {
				dispatch(new CreateTaxResponseAction(request, response.data))
				cb && cb(true)
			})
			.catch((error) => {
				dispatch(new CreateTaxErrorAction(request, error))
				handleApiErrorWithNotification(error)
				cb && cb(false)
			})
	}
}
