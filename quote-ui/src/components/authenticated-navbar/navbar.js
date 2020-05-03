import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import logout from 'actions/logout';
import { Button } from 'components/form';
import { Brand } from 'components/brand';
import { Navbar } from 'components/navbar';

const AuthenticatedNavbar = () => {
  const dispatch = useDispatch();
  const onLogout = useCallback(
    () => dispatch(logout),
    [dispatch],
  );
  return (
    <Navbar>
      <Navbar.Left>
        <Brand/>
      </Navbar.Left>
      <Navbar.Right>
        <Button onClick={onLogout} magnitude="header">Sign out</Button>
      </Navbar.Right>
    </Navbar>
  );
};


export { AuthenticatedNavbar };
