import {
  CreateCompanyRequestAction,
  CreateCompanyResponseAction,
  CreateCompanyErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { CompanyDetails, CompanyParams } from '../models'

export default (params: CompanyParams, cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | CreateCompanyRequestAction
        | CreateCompanyResponseAction
        | CreateCompanyErrorAction,
    ) => void,
  ) => {
    const request = new CreateCompanyRequestAction(params)
    dispatch(request)

    protectedApiClient
      .post<CompanyDetails>('/company/create', params)
      .then((response) => {
        dispatch(new CreateCompanyResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new CreateCompanyErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}
