import { createSelector } from 'reselect';
import { get, pipe, sortBy, values } from 'lodash/fp';

const filesSelector = createSelector(
  get(['file', 'data']),
  pipe(
    values,
    sortBy('id'),
  )
);


export default filesSelector;
