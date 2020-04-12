import React from 'react';
import { Link } from 'react-router-dom';

const UnauthenticatedNavbar = () => (
  <nav class='navbar' role='navigation' aria-label='main navigation'>
    <div class='navbar-brand'>
      <Link className='navbar-item title is-4' to='/'><i class="far fa-comment-alt"></i>&nbsp;&nbsp;The Quotefiles</Link>
    </div>
    <div class='navbar-menu'>
      <div class='navbar-end'>
        <div class='navbar-item'>
          <div class='buttons'>
            <Link class='button is-light' to='/login'>Login</Link>
            <Link class='button is-primary' to='/signup'>Signup</Link>
          </div>
        </div>
      </div>
    </div>
  </nav>
);


export default UnauthenticatedNavbar;
