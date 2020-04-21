import axios from 'axios';
import get from 'lodash/fp';

const withApi = (action) => {
  return (dispatch, getState) => {
    const token = get(['session', 'token'], getState());
    const api = axios.create({
      // FIX: implement properly
      baseURL: 'http://localhost:8000',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      }
    });
    return dispatch(action(api));
  };
};

const withUnauthenticatedApi = (action) => {
  return (dispatch, getState) => {
    const api = axios.create({
      // FIX: implement properly
      baseURL: 'http://localhost:8000',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    });
    return dispatch(action(api));
  };
};


export { withApi, withUnauthenticatedApi };
