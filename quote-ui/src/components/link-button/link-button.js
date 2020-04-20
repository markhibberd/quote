import React from 'react';
import PropTypes from 'prop-types';
import { Button } from './link-button.styles';

const LinkButton = ({ to, variant, label, magnitude }) => (
  <Button to={to} variant={variant} magnitude={magnitude}>{label}</Button>
);

LinkButton.propTypes = {
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  variant: PropTypes.oneOf([
    'default',
    'primary',
  ]),
  magnitude: PropTypes.oneOf([
    'default',
    'header'
  ]),
};

LinkButton.defaultProps = {
  variant: 'default',
  magnitude: 'default',
};

export { LinkButton };
