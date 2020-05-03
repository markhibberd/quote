import { createSlice } from '@reduxjs/toolkit';
import { pipe, get, keyBy } from 'lodash/fp';

const { reducer, actions } = createSlice({
  name: 'file',
  initialState: {
    status: 'stale'
  },
  reducers: {
    fetching: (state) => ({ ...state, status: 'fetching' }),
    fetched: (state, action) => ({ ...state, status: 'up-to-date', ...pipe(get('payload'), keyBy('id'))(action) }),
    failed: (state) => ({ status: 'failed' }),
  },
});


export { reducer, actions };
