import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import isAuthenticatedSelector from 'selectors/isAuthenticatedSelector';
import AuthenticatedApp from './AuthenticatedApp';
import UnauthenticatedApp from './UnauthenticatedApp';

const App = ({ history }) => {
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const Page = isAuthenticated ? AuthenticatedApp : UnauthenticatedApp;
  return <Page history={history}/>;
};

App.propTypes = {
  history: PropTypes.object.isRequired,
};

App.defaultProps = {
};

export default App;
