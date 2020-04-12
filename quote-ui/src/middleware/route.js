import { push } from 'connected-react-router';
import { actions as sessionActions } from 'reducers/session';

const createRouteMiddleware = () => {
  return ({ dispatch }) => (next) => (action) => {
    next(action);

    if (action.error) {
      return;
    }

    if (action.type ===  sessionActions.login.type) {
      dispatch(push(`/`, { autoSelect: true }));
    }

  };
};

export default createRouteMiddleware;
