import { createSelector } from 'reselect';
import { get, isNil } from 'lodash/fp';

const isAuthenticatedSelector = createSelector(
  get(['session', 'token']),
  (token) => !isNil(token),
);


export default isAuthenticatedSelector;
