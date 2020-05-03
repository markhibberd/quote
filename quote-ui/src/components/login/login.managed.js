import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'lodash/fp';
import login from 'actions/login';
import { Login } from './login';

const ManagedLogin = () => {
  const dispatch = useDispatch();
  const session = useSelector(get(['session']));
  const loggingIn = useSelector(get(['session', 'loggingIn']));
console.log("SESSION", session);
  const onLogin = useCallback(
    (email, password) => dispatch(login({ email, password })),
    [dispatch],
  );
  return <Login loggingIn={loggingIn} onLogin={onLogin} />;
};


export { ManagedLogin };
