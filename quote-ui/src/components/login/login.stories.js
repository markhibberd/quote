import React from 'react';
import { Login } from './login';

export default { title: 'Login' };

const onLogin = (email, password) =>
  alert(`Logging in ${email} with ${password}`); // eslint-disable-line

export const Basic = () => (
  <Login onLogin={onLogin}/>
);
