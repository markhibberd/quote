import React from 'react';
import { Registration } from './registration';

export default { title: 'Registration' };

const onRegister = (email, password) =>
  alert(`Registering ${email} with ${password}`);

export const Basic = () => (
  <Registration onRegister={onRegister}/>
);
