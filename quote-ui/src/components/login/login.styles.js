import styled from 'styled-components';

const Title = styled.h1`
  line-height: ${({ theme, magnitude }) => theme.font.height.title};
  font-size: ${({ theme, magnitude }) => theme.font.size.title};
  font-weight: ${({ theme, magnitude }) => theme.font.weight.title};
  font-family: ${({ theme }) => theme.font.family};

`
export { Title };
