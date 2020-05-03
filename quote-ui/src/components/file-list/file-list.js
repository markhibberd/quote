import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { filter, includes, isEmpty } from 'lodash/fp';
import { Search, PlusCircle, FileText } from 'react-feather';
import {
  FileListContainer,
  FileListMenu,
  FileListSearch,
  FileListSearchBox,
  FileListNew,
  FileListItems,
  FileListItem,
  FileListName,
} from './file-list.styles';

const FileList = ({ files }) => {
  const [search, setSearch] = useState('');
  const onSearch = useCallback((e) => setSearch(e.target.value), [setSearch]);
  const filtered = useMemo(() => filter(
    ({ name }) => isEmpty(search) || includes(search.toLowerCase(), name.toLowerCase()),
  )(files), [files, search])
  return (
    <FileListContainer>
      <FileListMenu>
        <FileListSearch>
          <Search size={20}/>
          <FileListSearchBox type='text' placeholder='Filter' onChange={onSearch} autoFocus/>
        </FileListSearch>
        <FileListNew>
          <PlusCircle size={20}/>
        </FileListNew>
      </FileListMenu>
      <FileListItems>
        {filtered.length === 0 && (
          <p>No items</p>
        )}
        {filtered.length > 0 && filtered.map(({ name }) => (
          <FileListItem>
            <FileText size={40} strokeWidth={1}/>

            <FileListName>{name}</FileListName>
          </FileListItem>
        ))}
      </FileListItems>
    </FileListContainer>
  );
};
FileList.propTypes = {
  files: PropTypes.array.isRequired,
};

FileList.defaultProps = {
}


export { FileList };
