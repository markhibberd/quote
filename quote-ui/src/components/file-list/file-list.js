import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { filter, includes, isEmpty } from 'lodash/fp';
import { Search, PlusCircle, Book, Share } from 'react-feather';
import {
  FileListContainer,
  FileListMenu,
  FileListSearch,
  FileListSearchBox,
  FileListNew,
  FileListItems,
  FileListItem,
  FileListName,
  FileListNone,
} from './file-list.styles';

const FileList = ({ files, onCreate }) => {
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
        <FileListNew tabIndex={0} onClick={onCreate}>
          <PlusCircle size={20}/>
        </FileListNew>
      </FileListMenu>
      <FileListItems>
        {files.length === 0 && (
          <FileListNone>No quotefiles, add one to start</FileListNone>
        )}
        {files.length > 0 && filtered.length === 0 && (
          <FileListNone>No quotefiles matching &ldquo;{search}&rdquo;</FileListNone>
        )}
        {filtered.length > 0 && filtered.map(({ name }) => (
          <FileListItem>
            <Book size={20} strokeWidth={1}/>
            <FileListName>{name}</FileListName>
            <Share size={20} strokeWidth={1}/>
          </FileListItem>
        ))}
      </FileListItems>
    </FileListContainer>
  );
};
FileList.propTypes = {
  files: PropTypes.array.isRequired,
  onCreate: PropTypes.func.isRequired,
};

FileList.defaultProps = {
}


export { FileList };
