import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { filter, includes, isEmpty } from 'lodash/fp';
import { Search, PlusCircle, Book /*, Share */ } from 'react-feather';
import { InlineForm, Input, Button } from 'components/form';
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
  const [newFilename, setNewFilename] = useState('');
  const [createMode, setCreateMode] = useState(false);
  const onCreateModeEnable = useCallback(() => setCreateMode(true), [setCreateMode]);
  const onCreateModeDisable = useCallback(() => setCreateMode(false), [setCreateMode]);
  const onSearch = useCallback((e) => setSearch(e.target.value), [setSearch]);
  const onNewFilename = useCallback((e) => setNewFilename(e.target.value), [setNewFilename]);
  const onNewKeyDown = useCallback((e) => {
    e.stopPropagation();
    e.preventDefault();
    if (e.keyCode === 13) onCreateModeEnable()
  }, [onCreateModeEnable]);
  const onNewInputKeyDown = useCallback((e) => {
    if (e.keyCode === 27) onCreateModeDisable()
  }, [onCreateModeDisable]);
  const onCreateSave = useCallback((e) => {
    e.stopPropagation();
    e.preventDefault();
    onCreate(newFilename);
    onCreateModeDisable();
  }, [newFilename, onCreate, onCreateModeDisable]);
  const filtered = useMemo(() => filter(
    ({ name }) => isEmpty(search) || includes(search.toLowerCase(), name.toLowerCase()),
  )(files), [files, search])

  return (
    <FileListContainer>
      <FileListMenu>
        {!createMode && (
          <>
            <FileListSearch>
              <Search size={20}/>
              <FileListSearchBox type="text" placeholder="Filter" value={search} onChange={onSearch} autoFocus/>
            </FileListSearch>
            <FileListNew tabIndex={0} onClick={onCreateModeEnable} onKeyDown={onNewKeyDown}>
              <PlusCircle size={20}/>
            </FileListNew>
          </>
        )}
        {createMode && (
          <InlineForm onSubmit={onCreateSave}>
            <Input type="text" name="filename" onKeyDown={onNewInputKeyDown} onChange={onNewFilename} placeholder="Quotefile name" autoFocus/>
            <Button onClick={onCreateModeDisable} type="reset">Cancel</Button>
            <Button type="submit" variant="primary">Create</Button>
          </InlineForm>
        )}
      </FileListMenu>
      <FileListItems>
        {files.length === 0 && (
          <FileListNone>No quotefiles, add one to start</FileListNone>
        )}
        {files.length > 0 && filtered.length === 0 && (
          <FileListNone>No quotefiles matching &ldquo;{search}&rdquo;</FileListNone>
        )}
        {filtered.length > 0 && filtered.map(({ id, name }) => (
          <FileListItem>
            <Book size={20} strokeWidth={1}/>
            <FileListName to={`/quotes/${id}`}>{name}</FileListName>
            {/* TODO: complete sharing modal
            <Share size={20} strokeWidth={1}/>
            */}
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
