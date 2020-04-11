import React from 'react';
import { useSelector } from 'react-redux';
import isAuthenticatedSelector from 'selectors/isAuthenticatedSelector';
import AuthenticatedApp from './AuthenticatedApp';
import UnauthenticatedApp from './UnauthenticatedApp';

const App = ({ history }) => {
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const Page = isAuthenticated ? AuthenticatedApp : UnauthenticatedApp;
  return <Page history={history}/>;
};

export default App;
