import React from 'react';
import PropTypes from 'prop-types';
import { Button } from './link-button.styles';

const LinkButton = ({ to, variant, label, magnitude }) => { console.log("M", magnitude); return (
  <Button to={to} variant={variant} magnitude={magnitude}>{label}</Button>
)};

LinkButton.propTypes = {
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  variant: PropTypes.oneOf([
    'default'
  ]),
  magnitude: PropTypes.oneOf([
    'default',
    'heading'
  ]),
};

LinkButton.defaultProps = {
  variant: 'default',
  magnitude: 'default',
};

export { LinkButton };
