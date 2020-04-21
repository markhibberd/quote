import React from 'react';
import PropTypes from 'prop-types';
import { Nav, Left, Right } from './navbar.styles';

const Navbar = ({ children }) => (
  <Nav>
    {children}
  </Nav>
);


Navbar.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node).isRequired,
  ]),
};

Navbar.defaultProps = {
  children: null,
};

Navbar.Left = Left;
Navbar.Right = Right;

export { Navbar };
