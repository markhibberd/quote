import React from 'react';
import { Link } from 'react-router-dom';
import { Nav } from './navbar.styles';

const UnauthenticatedNavbar = () => (
  <Nav>
    <div>
      <Link to='/'><i class="far fa-comment-alt"></i>&nbsp;&nbsp;The Quotefiles</Link>
    </div>
    <div>
      <div>
        <div>
          <div>
            <Link to='/login'>Login</Link>
            <Link to='/signup'>Signup</Link>
          </div>
        </div>
      </div>
    </div>
  </Nav>
);


export { UnauthenticatedNavbar };
