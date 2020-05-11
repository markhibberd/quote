import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FileListContainer = styled.div`
  max-width: 800px;
  display: flex;
  flex: 1 0 auto;
  flex-direction: column;
  line-height: ${({ theme }) => theme.font.height.header};
  font-size: ${({ theme }) => theme.font.size.header};
  font-weight: ${({ theme }) => theme.font.weight.header};
  font-family: ${({ theme }) => theme.font.family};
  color: ${({ theme }) => theme.color.header};
`;

const FileListMenu = styled.div`
  display: flex;
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: 48px;
  flex-direction: row;
  align-items: center;
  padding-left: 8px;
  padding-right: 8px;
  border-bottom: 1px solid #e8e8e8;
`

const FileListSearchBox = styled.input`
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: auto;
  padding: 4px;
  margin-left: 12px;
  margin-right: 12px;
  line-height: ${({ theme }) => theme.font.height.header};
  font-size: ${({ theme }) => theme.font.size.header};
  font-weight: ${({ theme }) => theme.font.weight.light};
  font-family: ${({ theme }) => theme.font.family};
  width: 100%
  border: 0;
  box-shadow: none;
  border-color: transparent;
  outline: none;
  appearance: none;
  -moz-appearance: none;
  ::-moz-focus-inner: {
    border: 0;
    padding: 0;
  }
`
const FileListSearch = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: auto;
  font-weight: ${({ theme }) => theme.font.weight.light};
`

const FileListNew = styled.div`
  align-items: center;
  display: flex;
  flex-grow: 0;
  flex-shrink: 0;
  cursor: pointer;
`

const FileListItems = styled.div`
  display: flex;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: auto;
  flex-direction: column;
`

const FileListItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: 32px;
  height: 32px;
  padding: 8px;
`

const FileListName = styled(Link)`
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: auto;
  padding-left: 16px;
  text-decoration: none;
  color: #363636;
  line-height: ${({ theme }) => theme.font.height.default};
  font-size: ${({ theme }) => theme.font.size.default};
  font-weight: ${({ theme }) => theme.font.weight.default};
  font-family: ${({ theme }) => theme.font.family};
`;

const FileListNone = styled.p`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: 32px;
  height: 32px;
  padding: 8px;
  margin: 0;
  line-height: ${({ theme }) => theme.font.height.default};
  font-size: ${({ theme }) => theme.font.size.default};
  font-weight: ${({ theme }) => theme.font.weight.default};
  font-family: ${({ theme }) => theme.font.family};
  color: #363636;
`;

export {
  FileListContainer,
  FileListMenu,
  FileListSearch,
  FileListSearchBox,
  FileListNew,
  FileListItems,
  FileListItem,
  FileListName,
  FileListNone,
};
