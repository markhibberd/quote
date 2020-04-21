import React, { useState, useCallback } from 'react';
import { Title } from './login.styles';
import { Layout } from 'components/layout';
import { Form, Control, Buttons, Button, Input } from 'components/form';

const Login = ({ onLogin }) => {
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
      onLogin(email, password);
    },
    [onLogin, email, password],
  );

  return (
    <Layout.Row center>
      <Form maxWidth={400} magnitude='header'>
        <Title>Sign in to Quotefile</Title>
        <Control label='Email'>
          <Input type='text' name='email' value={email} onChange={onEmailChange} placeholder='Enter your email address' autoFocus/>
        </Control>
        <Control label='Password'>
          <Input type='password' name='password' value={password} onChange={onPasswordChange} placeholder='Enter your password'/>
        </Control>
        <Buttons>
          <Button magnitude='header' display='block' onClick={onSubmit} variant='primary'>Sign in</Button>
        </Buttons>
      </Form>
    </Layout.Row>
  );
};


export { Login };
