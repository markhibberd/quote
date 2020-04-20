import React from 'react';
import { BrandContainer, BrandTitle } from './brand.styles';
import { MessageSquare } from 'react-feather';

const Brand = () => (
  <BrandContainer>
    <MessageSquare size={20}/>
    <BrandTitle>The Quotefiles</BrandTitle>
  </BrandContainer>
);


export { Brand };
