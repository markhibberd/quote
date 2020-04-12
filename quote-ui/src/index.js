import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { createBrowserHistory } from 'history';
import './index.css';
import createStore from './store';
import './App.sass';
import App from './App';

import * as serviceWorker from './serviceWorker';

const history = createBrowserHistory();
const store = createStore(history)

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <App history={history} />
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
