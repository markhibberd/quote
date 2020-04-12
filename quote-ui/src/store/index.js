import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from 'reducers';
import createRouteMiddleware from 'middleware/route';

const createStore = (history) => configureStore({
  reducer: createRootReducer(history),
  middleware: [
    ...getDefaultMiddleware(),
    routerMiddleware(history),
    createRouteMiddleware(),
  ]
});

export default createStore;
