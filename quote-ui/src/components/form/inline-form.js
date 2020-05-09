import React from 'react';
import PropTypes from 'prop-types';
import { InlineFormBlock, } from './form.styles';

const InlineForm = ({ magnitude, children, maxWidth, onSubmit }) => {
  return (
    <InlineFormBlock maxWidth={maxWidth} onSubmit={onSubmit}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { magnitude }))}
    </InlineFormBlock>
  );
};

InlineForm.propTypes = {
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

InlineForm.defaultProps = {
  children: undefined,
  magnitude: 'default',
  maxWidth: undefined,
  onSubmit: undefined,
};

export { InlineForm };
