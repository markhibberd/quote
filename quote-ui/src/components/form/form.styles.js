import styled from 'styled-components';

const FormBlock = styled.div`
  ${({ maxWidth }) => maxWidth ? `max-width: ${maxWidth}px;` : ''}
  flex: 1 0 auto;
`;

// FIX: Needs to be a proper component and pass through 'magnitude';
const Buttons = styled.div`
  margin-top: 16px;
  display: flex;
  & > button {
    margin-left: 16px;
  }
  & > :first-of-type {
    margin-left: 0px;
  }
  justify-content: $({ align }) => ({
    right: 'flex-end',
    left: 'flex-start',
  }[align || 'right']);
`;

const Button = styled.button`
  display: inline-block;
  background-color: ${({ theme, variant }) => ({
    default: '#FFFFFF',
    primary: theme.color.primary,
  }[variant || 'default'])};
  box-sizing: border-box;
  border-style: solid;
  border-color: ${({ theme, variant }) => ({
    default: '#e8e8e8',
    primary: theme.color.primary,
  }[variant])};
  border-width: 1px;
  border-radius: 2px;
  color: ${({ variant }) => ({
    default: '#363636',
    primary: '#FFFFFF',
  }[variant || 'default'])};
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  white-space: nowrap;
  padding-left: 12px;
  padding-right: 12px;
  padding-bottom: 8px;
  padding-top: 8px;
  line-height: ${({ theme, magnitude }) => theme.font.height[magnitude || 'default']};
  font-size: ${({ theme, magnitude }) => theme.font.size[magnitude || 'default']};
  font-weight: ${({ theme, magnitude }) => theme.font.weight[magnitude || 'default']};
  font-family: ${({ theme }) => theme.font.family};
  width: $100%;
  display: ${({ display }) => display || 'inline-block'};
  width: ${({ display }) => ({
    block: '100%',
    'inline-block': 'auto',
  }[display || 'inline-block'])};
`;

const Input = styled.input`
  -moz-appearance: textfield;
  outline: 0;
  width: 100%;
  border: 1px solid #d9d9d9;
  border-radius: 2;
  box-sizing: border-box;
  padding: 6px 8px;
  line-height: ${({ theme, magnitude }) => theme.font.height[magnitude || 'default']};
  font-size: ${({ theme, magnitude }) => theme.font.size[magnitude || 'default']};
  font-weight: ${({ theme, magnitude }) => theme.font.weight[magnitude || 'default']};
  font-family: ${({ theme }) => theme.font.family};
  &::placeholder {
    color: rgba(0, 0, 0, 0.25);
  }
`;

export { FormBlock, Button, Buttons, Input };
