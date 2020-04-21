import React, { useState, useCallback } from 'react';
import register from 'actions/register';

const Registration = ({ onRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onEmailChange = useCallback(
    (e) => setEmail(e.target.value),
    [setEmail],
  );
  const onPasswordChange = useCallback(
    (e) => setPassword(e.target.value),
    [setPassword],
  );

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      // TODO: validation.
      onRegister(email, password);
    },
    [onRegister, email, password],
  );

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>
          Email
          <input type='text' name='email' value={email} onChange={onEmailChange} autoFocus/>
        </label>
        <label>
          Password
          <input type='password' name='password' value={password} onChange={onPasswordChange} />
        </label>
        <button type='submit'>Register</button>
      </form>
    </div>
  );
};


export { Registration };
