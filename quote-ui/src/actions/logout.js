import { actions as sessionActions } from 'reducers/session';
import { withUnauthenticatedApi } from './api';

const logout = () =>
  withUnauthenticatedApi(api => (dispatch, getState) => {
    localStorage.removeItem('_quotefile_session');
    dispatch(sessionActions.logout());
  });

export default logout;
