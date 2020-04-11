import { withUnauthenticatedApi } from './api';

const register = ({ email, password }) =>
  withUnauthenticatedApi(api => (dispatch, getState) =>
    api.post('/user', { email, password })
  );

export default register;
