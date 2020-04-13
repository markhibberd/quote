import React from 'react';
import styled from 'styled-components';
import { UnauthenticatedNavbar } from 'components/unauthenticated-navbar';


const PageLayout = styled.div`
  display: flex;
  flex-direction: column;
`;

const Landing = () => (
  <UnauthenticatedNavbar/>
);


export default Landing;
