import React from 'react';
import { FileList } from './file-list';

export default { title: 'File list' };

export const Empty = () => <FileList files={[]}/>;

export const Single = () => (
  <FileList files={[
    { id: 1, name: 'Some file' }
  ]} />
);

export const Multi = () => (
  <FileList files={[
    { id: 1, name: 'Some file' },
    { id: 2, name: 'Some other file' },
  ]} />
);
