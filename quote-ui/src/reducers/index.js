import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as sessionReducer } from './session';
import { reducer as fileReducer } from './file';

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  session: sessionReducer,
  file: fileReducer,
});


export default createRootReducer;
