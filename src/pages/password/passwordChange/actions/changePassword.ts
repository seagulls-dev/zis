import {
  ChangePasswordRequestAction,
  ChangePasswordResponseAction,
  ChangePasswordErrorAction,
} from '.';
import { protectedApiClient } from 'helpers/api';
import { handleApiError } from 'helpers/errorHandling';
import { ChangePasswordState, ChangePasswordParams } from '../models';

export default (
  params: ChangePasswordParams,
  cb?: (isSuccess: boolean) => void
) => {
  return (
    dispatch: (
      arg:
        | ChangePasswordRequestAction
        | ChangePasswordResponseAction
        | ChangePasswordErrorAction
    ) => void
  ) => {
    const request = new ChangePasswordRequestAction(params);
    dispatch(request);

    protectedApiClient
      .post<ChangePasswordState>('/user/change-password', params)
      .then((response) => {
        dispatch(new ChangePasswordResponseAction(request, response.data));
        cb && cb(true);
      })
      .catch((error) => {
        dispatch(new ChangePasswordErrorAction(request, error));
        handleApiError(error);
        cb && cb(false);
      });
  };
};
