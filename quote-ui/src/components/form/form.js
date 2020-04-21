import React from 'react';
import PropTypes from 'prop-types';
import { FormBlock, Input, Button, Buttons } from './form.styles';
import { Control } from './control';

const Form = ({ magnitude, children, maxWidth }) => {
  return (
    <FormBlock maxWidth={maxWidth}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { magnitude }))}
    </FormBlock>
  );
}

Form.propTypes = {
  magnitude: PropTypes.oneOf([
    'default',
    'header',
  ]),
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node).isRequired,
  ]),
};

Form.defaultProps = {
  magnitude: 'default',
};

export { Control, Form, Input, Button, Buttons }
