import styled from 'styled-components';

const Nav = styled.nav`
  display: flex;
  flex: 0 0 auto;
  height: 48px;
  align-items: center;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.05);
  border-bottom: 1px solid #e8e8e8;
`

const Left = styled.div`
  display: flex;
  flex: 1 0 auto;
  justify-content: left;
  margin-left: 20px;
  & > * {
    margin-right: 16px;
  }
`

const Right = styled.div`
  display: flex;
  flex: 1 0 auto;
  justify-content: Right;
  margin-right: 20px;
  & > * {
    margin-left: 16px;
  }
`


export { Nav, Left, Right };
