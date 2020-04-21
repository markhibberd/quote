import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Registration from './registration';
import register from 'actions/register';

const ManagedRegistration = () => {
  const dispatch = useDispatch();
  const onRegister = useCallback(
    (email, password) => dispatch(register({ email, password })),
    [dispatch],
  );
  return <Registration onRegister={onRegister} />;
};


export { ManagedRegistration };
