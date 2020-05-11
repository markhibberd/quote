import { createSlice } from '@reduxjs/toolkit';
import { pipe, get, keyBy } from 'lodash/fp';

const { reducer, actions } = createSlice({
  name: 'file',
  initialState: {
    // stale -> fetching -> ok | failed
    status: 'stale',
    // ok -> creating -> ok | failed
    create: 'ok',
    data: {},
  },
  reducers: {
    creating: (state) => ({ ...state, create: 'creating' }),
    create: (state) => ({ ...state, create: 'ok', data: ({ ...state.data, [state.action.payload.id]: state.action.payload }) }),
    fetching: (state) => ({ ...state, status: 'fetching' }),
    fetched: (state, action) => ({ status: 'ok', data: pipe(get('payload'), keyBy('id'))(action) }),
    failed: (state) => ({ ...state, status: 'failed' }),
    createFailed: (state) => ({ ...state, create: 'failed' }),
  },
});


export { reducer, actions };
