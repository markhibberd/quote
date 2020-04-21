import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Login from './login';
import login from 'actions/login';

const ManagedLogin = () => {
  const dispatch = useDispatch();
  const onLogin = useCallback(
    (email, password) => dispatch(login({ email, password })),
    [dispatch],
  );
  return <Login onLogin={onLogin} />;
};


export { ManagedLogin };
