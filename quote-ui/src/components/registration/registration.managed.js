import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import register from 'actions/register';
import { Registration } from './registration';

const ManagedRegistration = () => {
  const dispatch = useDispatch();
  const onRegister = useCallback(
    (email, password) => dispatch(register({ email, password })),
    [dispatch],
  );
  return <Registration onRegister={onRegister} />;
};


export { ManagedRegistration };
