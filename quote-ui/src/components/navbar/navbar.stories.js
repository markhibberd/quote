import React from 'react';
import { Brand } from 'components/brand';
import { Navbar } from './navbar';
import { LinkButton } from 'components/link-button';

export default { title: 'Navbar' };

export const Basic = () => (
  <Navbar>
    <Navbar.Left>
      <Brand/>
      <LinkButton to='/something' label='Something'/>
    </Navbar.Left>
    <Navbar.Right>
      <LinkButton to='/login' label='Login' magnitude='header'/>
      <LinkButton to='/signup' label='Signup'/>
    </Navbar.Right>
  </Navbar>
);
