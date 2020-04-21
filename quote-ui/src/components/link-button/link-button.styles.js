import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Button = styled(Link)`
  display: inline-block;
  background-color: ${({ theme, variant }) => ({
    default: '#FFFFFF',
    primary: theme.color.primary,
  }[variant])};
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
  }[variant])};
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  white-space: nowrap;
  padding-left: 12px;
  padding-right: 12px;
  padding-bottom: 8px;
  padding-top: 8px;
  line-height: ${({ theme, magnitude }) => theme.font.height[magnitude]};
  font-size: ${({ theme, magnitude }) => theme.font.size[magnitude]};
  font-weight: ${({ theme, magnitude }) => theme.font.weight[magnitude]};
  font-family: ${({ theme }) => theme.font.family};
}
`

export { Button };
