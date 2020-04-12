import { withUnauthenticatedApi } from './api';
import { get } from 'lodash/fp';
import { actions as sessionActions } from 'reducers/session';

const login = ({ email, password }) =>
  withUnauthenticatedApi(api => (dispatch, getState) => {
    dispatch(sessionActions.loggingIn());
    return api.post('/session', { email, password })
      .then(response => dispatch(sessionActions.login(get(['data', 'token'], response))))
      .catch(response => dispatch(sessionActions.loginError(get('data', response))))
  });

export default login;
