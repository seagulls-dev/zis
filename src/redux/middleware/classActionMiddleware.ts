import { ReduxAction } from 'common/actions';
import { Action, Middleware, MiddlewareAPI } from 'redux';

const classActionMiddleware: Middleware = (store: MiddlewareAPI) => (
  next: (action: Action) => void
) => (action: Action) => {
  // if action is class action, use spread operator to tranform it to plain object
  if (((action as unknown) as ReduxAction) != null) {
    return next({ ...action });
  }
  return next(action);
};

export default classActionMiddleware;
