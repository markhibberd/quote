import React from 'react';
import { LinkButton } from 'components/link-button';
import { Brand } from 'components/brand';
import { Navbar } from 'components/navbar';

const UnauthenticatedNavbar = () => (
  <Navbar>
    <Navbar.Left>
      <Brand/>
    </Navbar.Left>
    <Navbar.Right>
      <LinkButton to='/login' label='Sign in' magnitude='header'/>
      <LinkButton to='/signup' label='Sign up' magnitude='header' variant='primary'/>
    </Navbar.Right>
  </Navbar>
);


export { UnauthenticatedNavbar };
