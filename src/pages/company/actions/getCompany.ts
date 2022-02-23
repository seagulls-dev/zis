import {
  GetCompanyRequestAction,
  GetCompanyResponseAction,
  GetCompanyErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { CompanyDetails } from '../models'

export default (id: number, cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | GetCompanyRequestAction
        | GetCompanyResponseAction
        | GetCompanyErrorAction,
    ) => void,
  ) => {
    const request = new GetCompanyRequestAction(id)
    dispatch(request)

    protectedApiClient
      .get<CompanyDetails>(`/company/get?id=${id}`)
      .then((response) => {
        dispatch(new GetCompanyResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new GetCompanyErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}
