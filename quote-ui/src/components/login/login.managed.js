import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import login from 'actions/login';
import { Login } from './login';

const ManagedLogin = () => {
  const dispatch = useDispatch();
  const onLogin = useCallback(
    (email, password) => dispatch(login({ email, password })),
    [dispatch],
  );
  return <Login onLogin={onLogin} />;
};


export { ManagedLogin };
