import { createSlice } from '@reduxjs/toolkit';
import { set } from 'lodash/fp';

const { reducer, actions } = createSlice({
  name: 'session',
  initialState: {
    token: localStorage.getItem('_quotefile_session'),
  },
  reducers: {
    login: (state, action) => set('token', action.payload, state),
  },
});


export { reducer, actions };
