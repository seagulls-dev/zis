import { GetSettingSelfRequestAction, GetSettingSelfResponseAction, GetSettingSelfErrorAction } from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { SettingsDetails } from 'pages/settings/models'

export default (cb?: (isSuccess: boolean) => void) => {
  return (dispatch: (args: GetSettingSelfRequestAction | GetSettingSelfResponseAction | GetSettingSelfErrorAction) => void) => {
    const request = new GetSettingSelfRequestAction()
    dispatch(request)

    protectedApiClient.get<SettingsDetails[]>('/user/setting/get-self')
      .then(response => {
        dispatch(new GetSettingSelfResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch(error => {
        dispatch(new GetSettingSelfErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}
