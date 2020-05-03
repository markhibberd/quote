import { get } from 'lodash/fp';
import { actions as fileActions } from 'reducers/file';
import { withApi } from './api';

const fetchFiles = () =>
  withApi(api => (dispatch, getState) => {
    dispatch(fileActions.fetching());
    return api.get('/quotes')
      .then(response => dispatch(fileActions.fetched(get(['data', 'files'], response))))
      .catch(response => dispatch(fileActions.failed()));
  });

export default fetchFiles;
