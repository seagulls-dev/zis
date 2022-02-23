import { GetRootGroupRequestAction, GetRootGroupResponseAction, GetRootGroupErrorAction } from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { GroupDetails } from '../models'

export default (cb?:(isSuccess: boolean, id?: number) => void) => {
  return (dispatch: (args: GetRootGroupRequestAction | GetRootGroupResponseAction | GetRootGroupErrorAction) => void) => {
    const request = new GetRootGroupRequestAction()
    dispatch(request)

    protectedApiClient.get<GroupDetails>('/user/user-group/get-root?expand=users,roles,customer')
      .then(response => {
        dispatch(new GetRootGroupResponseAction(request, response.data))
        cb && cb(true, response.data.id)
      })
      .catch(error => {
        dispatch(new GetRootGroupErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}
