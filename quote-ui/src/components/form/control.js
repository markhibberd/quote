import React from 'react';
import PropTypes from 'prop-types';
import { useId } from '@reach/auto-id';
import { ControlBlock, Label } from './control.styles';

const Control = ({ label, magnitude, children }) => {
  const id = useId();

  return (
    <ControlBlock>
      {label && <Label magnitude={magnitude} htmlFor={id}>{label}</Label>}
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { id, magnitude }))}
    </ControlBlock>
  );
};

Control.propTypes = {
  label: PropTypes.string,
  magnitude: PropTypes.oneOf([
    'default',
    'header',
  ]),
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node).isRequired,
  ]),
};

Control.defaultProps = {
  children: null,
  label: null,
  magnitude: 'default',
};

export { Control };
