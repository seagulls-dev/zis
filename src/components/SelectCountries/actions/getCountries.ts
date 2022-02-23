import {
  GetCountriesRequestAction,
  GetCountriesResponseAction,
  GetCountriesErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'

export default (cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | GetCountriesRequestAction
        | GetCountriesResponseAction
        | GetCountriesErrorAction,
    ) => void,
  ) => {
    const request = new GetCountriesRequestAction()
    dispatch(request)

    protectedApiClient
      .get<{}>('/helper/get-countries')
      .then((response) => {
        dispatch(new GetCountriesResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new GetCountriesErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}
