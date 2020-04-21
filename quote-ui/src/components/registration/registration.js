import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'components/layout';
import { Form, Control, Buttons, Button, Input } from 'components/form';
import { Title } from './registration.styles';

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
    <Layout.Row center>
      <Form maxWidth={400} magnitude="header">
        <Title>Register with Quotefile</Title>
        <Control label="Email">
          <Input type="text" name="email" value={email} onChange={onEmailChange} placeholder="Enter your email address" autoFocus/>
        </Control>
        <Control label="Password">
          <Input type="password" name="password" value={password} onChange={onPasswordChange} placeholder="Choose a password"/>
        </Control>
        <Buttons>
          <Button magnitude="header" display="block" onClick={onSubmit} variant="primary">Register</Button>
        </Buttons>
      </Form>
    </Layout.Row>
  );
};


Registration.propTypes = {
  onRegister: PropTypes.func.isRequired,
};

export { Registration };
