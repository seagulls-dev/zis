import { TokenExpiredAction } from '.'
import { removeCurrentUser } from 'helpers/authHelpers'

export const tokenExpired = () => {
  removeCurrentUser()
  return new TokenExpiredAction()
}
