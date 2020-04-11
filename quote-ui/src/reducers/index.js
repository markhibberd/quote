import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
import { reducer as sessionReducer } from './session';

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  session: sessionReducer,

});


export default createRootReducer;
