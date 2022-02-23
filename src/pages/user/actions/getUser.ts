import {
  GetUserRequestAction,
  GetUserResponseAction,
  GetUserErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { UserDetails } from 'pages/user/models'

export default (id: number, cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg: GetUserRequestAction | GetUserResponseAction | GetUserErrorAction,
    ) => void,
  ) => {
    const request = new GetUserRequestAction()
    dispatch(request)

    protectedApiClient
      .get<UserDetails>(`/user/get?id=${id}`)
      .then((response) => {
        dispatch(new GetUserResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new GetUserErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}
