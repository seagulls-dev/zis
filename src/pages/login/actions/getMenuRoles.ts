import { GetMenuRolesRequestAction, GetMenuRolesResponseAction, GetMenuRolesErrorAction } from '.'
import {protectedApiClient} from 'helpers/api'
import {handleApiErrorWithNotification} from 'helpers/errorHandling'

export default (cb?: (isSuccess: boolean) => void) => {
  return (dispatch: (args: GetMenuRolesRequestAction | GetMenuRolesResponseAction | GetMenuRolesErrorAction) => void) => {
    const request = new GetMenuRolesRequestAction()
    dispatch(request)

    protectedApiClient
      .get<any>('/helper/get-app-controls')
      .then((response) => {
        dispatch(new GetMenuRolesResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch(error => {
        dispatch(new GetMenuRolesErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}
