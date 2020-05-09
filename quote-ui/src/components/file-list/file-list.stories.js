import React from 'react';
import { FileList } from './file-list';

export default { title: 'File list' };

const onCreate = (name) =>
  alert(`Creating new quote ${name}`); // eslint-disable-line

export const Empty = () => (
  <FileList onCreate={onCreate} files={[
  ]} />
);

export const Single = () => (
  <FileList onCreate={onCreate} files={[
    { id: 1, name: 'Some file' }
  ]} />
);

export const Multi = () => (
  <FileList onCreate={onCreate} files={[
    { id: 1, name: 'Some file' },
    { id: 2, name: 'Some other file' },
  ]} />
);
