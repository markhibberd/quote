import { withUnauthenticatedApi } from './api';
import { get } from 'lodash/fp';
import { actions as sessionActions } from 'reducers/session';

const login = ({ email, password }) =>
  withUnauthenticatedApi(api => (dispatch, getState) =>
    api.post('/session', { email, password }).then(response =>
      dispatch(sessionActions.login(get(['data', 'token'], response)))));

export default login;
