import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Button = styled(Link)`
  background-color: #fff;
  border-style: solid;
  border-color: #d9d9d9;
  border-width: 1px;
  border-radius: 2px;
  color: #363636;
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
