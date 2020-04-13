import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { UnauthenticatedNavbar } from 'components/unauthenticated-navbar';
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
    <>
    <UnauthenticatedNavbar/>
    <section>
    <div class="container">
      <div class="columns is-desktop is-vcentered">
      <form onSubmit={onSubmit}>
        <div class="field">
          <label class="label">Email</label>
          <div class="control">
            <input class="input" type='text' name='email' value={email} onChange={onEmailChange} placeholder='email@example.com' autoFocus/>
            <span class="icon is-small is-left">
              <i class="fas fa-envelope"></i>
            </span>
          </div>
        </div>
        <div class="field">
          <label class="label">Password</label>
          <div class="control">
            <input class="input" type='password' name='password' value={password} onChange={onPasswordChange}/>
            <span class="icon is-small is-left">
              <i class="fas fa-lock"></i>
            </span>
          </div>
        </div>
        <div class="field">
          <p class="control">
            <button type='submit' class="button is-success">
              Login
            </button>
          </p>
        </div>
      </form>
      </div>
    </div>
    </section>
    </>
  );
};


export default Login;
