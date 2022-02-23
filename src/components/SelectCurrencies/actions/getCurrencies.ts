import {
  GetCurrenciesRequestAction,
  GetCurrenciesResponseAction,
  GetCurrenciesErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'

export default (cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | GetCurrenciesRequestAction
        | GetCurrenciesResponseAction
        | GetCurrenciesErrorAction,
    ) => void,
  ) => {
    const request = new GetCurrenciesRequestAction()
    dispatch(request)

    protectedApiClient
      .get<[]>('/helper/get-currencies')
      .then((response) => {
        dispatch(new GetCurrenciesResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new GetCurrenciesErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}
