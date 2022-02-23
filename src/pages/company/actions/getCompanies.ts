import {
  GetCompaniesRequestAction,
  GetCompaniesResponseAction,
  GetCompaniesErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { CompanyDetails } from '../models'

export default (cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | GetCompaniesRequestAction
        | GetCompaniesResponseAction
        | GetCompaniesErrorAction,
    ) => void,
  ) => {
    const request = new GetCompaniesRequestAction()
    dispatch(request)

    protectedApiClient
      .get<CompanyDetails[]>('/company/get-all?expand=customer')
      .then((response) => {
        dispatch(new GetCompaniesResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new GetCompaniesErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}
