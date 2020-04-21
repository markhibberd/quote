import styled from 'styled-components';

const ControlBlock = styled.div`
  margin-bottom: 8px;
`;

const Label = styled.label`
  color: #363636;
  display: block;
  line-height: ${({ theme, magnitude }) => theme.font.height[magnitude || 'default']};
  font-size: ${({ theme, magnitude }) => theme.font.size[magnitude || 'default']};
  font-weight: ${({ theme, magnitude }) => theme.font.weight[magnitude || 'default']};
  font-family: ${({ theme }) => theme.font.family};
  margin-bottom: 4px;
`;

export { ControlBlock, Label };
