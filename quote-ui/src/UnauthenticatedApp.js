import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route } from 'react-router-dom';
import Landing from 'components/landing';
import Login from 'components/login';
import Registration from 'components/registration';

const UnauthenticatedApp = ({ history }) => {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route
          exact
          component={Login}
          path='/login'
        />
        <Route
          exact
          component={Registration}
          path='/signup'
        />
        <Route
          exact
          component={Landing}
          path='/'
        />
      </Switch>
    </ConnectedRouter>
  );
};

export default UnauthenticatedApp;