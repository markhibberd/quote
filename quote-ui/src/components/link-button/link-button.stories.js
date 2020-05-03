import React from 'react';
import { LinkButton } from './link-button';

export default { title: 'Link button' };

export const Basic = () => (
  <LinkButton to="/" label="Sign in"/>
);


export const Header = () => (
  <LinkButton to="/" label="Sign in" magnitude="header"/>
);


export const Primary = () => (
  <LinkButton to="/" label="Sign in" variant="primary"/>
);
