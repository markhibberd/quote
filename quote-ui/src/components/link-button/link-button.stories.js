import React from 'react';
import { LinkButton } from './link-button';

export default { title: 'Link Button' };

export const Basic = () => (
  <LinkButton to='/' label='Sign in'/>
);


export const Header = () => (
  <LinkButton to='/' label='Sign in' magnitude='heading'/>
);
