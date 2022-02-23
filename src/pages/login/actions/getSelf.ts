import {UserDetailsRequestAction, UserDetailsResponseAction, UserDetailsErrorAction} from './index'
import {protectedApiClient} from 'helpers/api'
import {handleApiErrorWithNotification} from 'helpers/errorHandling'
import {UserDetails} from '../../user/models'

export default (expand?: string, cb?: (isSuccess: boolean) => void) => {
    return (dispatch: (arg: UserDetailsRequestAction | UserDetailsResponseAction | UserDetailsErrorAction) => void) => {
        const request = new UserDetailsRequestAction()
        dispatch(request)
        protectedApiClient
            .get<UserDetails>(`/user/get-self${expand ? '?expand=' + expand : ''}`)
            .then((response) => {
                dispatch(new UserDetailsResponseAction(request, response.data))
                cb && cb(true)
            })
            .catch((error) => {
                dispatch(new UserDetailsErrorAction(request, error))
                handleApiErrorWithNotification(error)
                cb && cb(false)
            })
    }
}
