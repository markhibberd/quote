import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import register from 'actions/register';

const Registration = () => {
  const dispatch = useDispatch();
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
      dispatch(register({ email, password }));
      return false;
    },
    [dispatch, email, password],
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


export default Registration;
