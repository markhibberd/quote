import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';
import { MemoryRouter } from 'react-router';
import { ThemeProvider, theme } from "../src/theme";
import createRootReducer from 'reducers';

const preloadedState = {
};

const history = createBrowserHistory();

const store = configureStore({
  reducer: createRootReducer(history),
  preloadedState,
});

const withThemeProvider = (story) => (
  <ThemeProvider theme={theme}>{story()}</ThemeProvider>
);

const withReduxProvider = (story) => (
  <ReduxProvider store={store}>{story()}</ReduxProvider>
);

const withMemoryRouter = (story) => (
  <MemoryRouter>{story()}</MemoryRouter>
);

export { withThemeProvider, withMemoryRouter, withReduxProvider };
