import { withUnauthenticatedApi } from './api';
import { actions as sessionActions } from 'reducers/session';

const logout = () =>
  withUnauthenticatedApi(api => (dispatch, getState) => {
    localStorage.removeItem('_quotefile_session')
    dispatch(sessionActions.logout());
  });

export default logout;
