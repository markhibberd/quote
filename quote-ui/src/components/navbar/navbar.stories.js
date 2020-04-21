import React from 'react';
import { Brand } from 'components/brand';
import { LinkButton } from 'components/link-button';
import { Navbar } from './navbar';

export default { title: 'Navbar' };

export const Basic = () => (
  <Navbar>
    <Navbar.Left>
      <Brand/>
      <LinkButton to="/something" label="Something"/>
    </Navbar.Left>
    <Navbar.Right>
      <LinkButton to="/login" label="Login"/>
      <LinkButton to="/signup" label="Signup"/>
    </Navbar.Right>
  </Navbar>
);
