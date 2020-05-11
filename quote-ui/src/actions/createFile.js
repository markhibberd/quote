import { get } from 'lodash/fp';
import { actions as fileActions } from 'reducers/file';
import { withApi } from './api';

const createFile = ({ name }) =>
  withApi(api => (dispatch, getState) => {
    dispatch(fileActions.creating());
    return api.post('/quotes', { name })
     .then(response => dispatch(fileActions.create(get('data', response))))
     .catch(response => dispatch(fileActions.createFailed()));
  });




export default createFile;
