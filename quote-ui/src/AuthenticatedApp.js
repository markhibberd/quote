import React from 'react';
import PropTypes from 'prop-types';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route } from 'react-router-dom';
import { AuthenticatedNavbar } from 'components/authenticated-navbar';
import Home from 'components/home';

const AuthenticatedApp = ({ history }) => {
  return (
    <ConnectedRouter history={history}>
      <AuthenticatedNavbar/>
      <Switch>
        <Route
          exact
          component={Home}
          path="/"
        />
      </Switch>
    </ConnectedRouter>
  );
};

AuthenticatedApp.propTypes = {
  history: PropTypes.object.isRequired,
};

AuthenticatedApp.defaultProps = {
};

export default AuthenticatedApp;
