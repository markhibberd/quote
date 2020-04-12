import { createSlice } from '@reduxjs/toolkit';

const { reducer, actions } = createSlice({
  name: 'session',
  initialState: {
    token: localStorage.getItem('_quotefile_session'),
    loggingIn: false,
    error: null,
  },
  reducers: {
    loggingIn: (state) => ({ ...state, error: null, loggingIn: true }),
    login: (state, action) => ({ ...state, token: action.payload, error: null, loggingIn: false }),
    loginError: (state, action) => ({ ...state, error: action.payload, loggingIn: false }),
    logout: () => ({}),
  },
});


export { reducer, actions };
