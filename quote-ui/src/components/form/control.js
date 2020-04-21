import React from 'react';
import PropTypes from 'prop-types';
import { ControlBlock, Label } from './control.styles';

import { useId } from '@reach/auto-id';

const Control = ({ label, magnitude, children }) => {
  const id = useId();

  return (
    <ControlBlock>
      {label && <Label magnitude={magnitude} htmlFor={id}>{label}</Label>}
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { id, magnitude }))}
    </ControlBlock>
  );
}

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
  label: null,
  magnitude: 'default',
};

export { Control }
