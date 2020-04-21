import React from 'react';
import { MessageSquare } from 'react-feather';
import { BrandContainer, BrandTitle } from './brand.styles';


const Brand = () => (
  <BrandContainer>
    <MessageSquare size={20}/>
    <BrandTitle>The Quotefiles</BrandTitle>
  </BrandContainer>
);


export { Brand };
