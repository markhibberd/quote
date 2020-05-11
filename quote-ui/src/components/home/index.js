import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { get } from 'lodash/fp';
import fetchFiles from 'actions/fetchFiles';
import createFile from 'actions/createFile';
import filesSelector from 'selectors/filesSelector';
import { Loading } from 'components/loading';
import { FileList } from 'components/file-list';
import { Layout } from 'components/layout';

const Home = () => {
  const dispatch = useDispatch();
  const status = useSelector(get(['file', 'status']));
  const files = useSelector(filesSelector);
  const onCreate = useCallback((name) => {
    dispatch(createFile({ name }));
  }, [dispatch]);

  useEffect(() => {
    if (status === 'stale') {
      dispatch(fetchFiles());
    }
  }, [dispatch, status]);

  if (status === 'fetching') {
    return <Loading/>;
  }
  return (
    <Layout.Row center>
      <FileList files={files} onCreate={onCreate}/>
    </Layout.Row>
  );
};


export default Home;
