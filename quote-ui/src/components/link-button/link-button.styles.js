import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Button = styled(Link)`
  background-color: ${({ theme, variant }) => ({
    default: '#FFFFFF',
    primary: theme.color.primary,
  }[variant])};
  border-style: solid;
  border-color: ${({ theme, variant }) => ({
    default: '#d9d9d9',
    primary: theme.color.primary,
  }[variant])};
  border-width: 1px;
  border-radius: 2px;
  color: ${({ variant }) => ({
    default: '#363636',
    primary: '#FFFFFF',
  }[variant])};
  cursor: pointer;
  justify-content: center;
  padding-left: 12px;
  padding-right: 12px;
  padding-bottom: 8px;
  padding-top: 8px;
  text-align: center;
  text-decoration: none;
  white-space: nowrap;
  line-height: ${({ theme, magnitude }) => theme.font.height[magnitude]};
  font-size: ${({ theme, magnitude }) => theme.font.size[magnitude]};
  font-weight: ${({ theme, magnitude }) => theme.font.weight[magnitude]};
  font-family: ${({ theme }) => theme.font.family};
}
`

export { Button };
