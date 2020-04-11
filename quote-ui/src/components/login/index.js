import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import login from 'actions/login';

const Login = () => {
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
      dispatch(login({ email, password }));
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
        <button type='submit'>Login</button>
      </form>
    </div>
  );
};


export default Login;
