import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route } from 'react-router-dom';

import Home from 'components/home';

const AuthenticatedApp = ({ history }) => {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route
          exact
          component={Home}
          path='/'
        />
      </Switch>
    </ConnectedRouter>
  );
};

export default AuthenticatedApp;
