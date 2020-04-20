import styled from 'styled-components';

const BrandContainer = styled.div`
  display: flex;
  align-items: center;
`

const BrandTitle = styled.div`
  flex: 0 0 auto;
  line-height: ${({ theme }) => theme.font.height.header};
  font-size: ${({ theme }) => theme.font.size.header};
  font-weight: ${({ theme }) => theme.font.weight.header};
  font-family: ${({ theme }) => theme.font.family};
  color: ${({ theme }) => theme.color.header};
  padding-left: 8px;
`

export { BrandContainer, BrandTitle };
