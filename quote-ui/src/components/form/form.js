import React from 'react';
import PropTypes from 'prop-types';
import { FormBlock, Input, Button, Buttons } from './form.styles';
import { Control } from './control';

const Form = ({ magnitude, children, maxWidth, onSubmit }) => {
  return (
    <FormBlock maxWidth={maxWidth} onSubmit={onSubmit}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { magnitude }))}
    </FormBlock>
  );
};

Form.propTypes = {
  magnitude: PropTypes.oneOf([
    'default',
    'header',
  ]),
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node).isRequired,
  ]),
  maxWidth: PropTypes.number,
  onSubmit: PropTypes.func,
};

Form.defaultProps = {
  children: undefined,
  magnitude: 'default',
  maxWidth: undefined,
  onSubmit: undefined,
};

export { Control, Form, Input, Button, Buttons };
