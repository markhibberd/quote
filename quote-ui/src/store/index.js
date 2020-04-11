import { configureStore } from '@reduxjs/toolkit';
import createRootReducer from '../reducers'


const createStore = (history) => configureStore({
  reducer: createRootReducer(history),
});

export default createStore;
