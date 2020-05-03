import { get } from 'lodash/fp';
import { actions as sessionActions } from 'reducers/session';
import { withUnauthenticatedApi } from './api';

const login = ({ email, password }) =>
  withUnauthenticatedApi(api => (dispatch, getState) => {
    dispatch(sessionActions.loggingIn());
    return api.post('/session', { email, password })
      .then(get(['data', 'token']))
      .then(token => localStorage.setItem('_quotefile_session', token))
      .then(token => dispatch(sessionActions.login(token)))
      .catch(response => dispatch(sessionActions.loginError(get('data', response))));
  });

export default login;
