import React from 'react';
import { Login } from './login';

export default { title: 'Login' };

const onLogin = (email, password) =>
  alert(`Logging in ${email} with ${password}`);

export const Basic = () => (
  <Login onLogin={onLogin}/>
);
