import React from 'react';
import { LoadingContainer, Dot } from './loading.styles';

const Loading = () => (
  <LoadingContainer className='spinner'>
    <Dot className='rect1' />
    <Dot className='rect2' />
    <Dot className='rect3' />
    <Dot className='rect4' />
    <Dot className='rect5' />
  </LoadingContainer>
);
export { Loading };
