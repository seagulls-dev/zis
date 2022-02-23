import {
  UserLogoutRequestAction,
  UserLogoutResponseAction,
  UserLogoutErrorAction,
} from './';
import { protectedApiClient } from 'helpers/api';
import { handleApiError } from 'helpers/errorHandling';
import { AuthState } from '../models';

export default (cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | UserLogoutRequestAction
        | UserLogoutResponseAction
        | UserLogoutErrorAction
    ) => void
  ) => {
    const request = new UserLogoutRequestAction();
    dispatch(request);

    protectedApiClient
      .post<AuthState>('/user/logout')
      .then((response) => {
        dispatch(new UserLogoutResponseAction());
        cb && cb(true);
      })
      .catch((error) => {
        dispatch(new UserLogoutErrorAction(request, error));
        handleApiError(error);
        cb && cb(false);
      });
  };
};
