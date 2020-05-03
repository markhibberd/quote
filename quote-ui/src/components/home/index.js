import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { get } from 'lodash/fp';
import fetchFiles from 'actions/fetchFiles';
import { Loading } from 'components/loading';

const Home = () => {
  const dispatch = useDispatch();
  const status = useSelector(get(['file', 'status']));

  useEffect(() => {
    if (status === 'stale') {
      dispatch(fetchFiles())
    }
  }, [dispatch, status]);

  if (status === 'fetching') {
    return <Loading/>;
  }
  return (
    <div>
          Authenticated Stuff
    </div>
  );
};


export default Home;
