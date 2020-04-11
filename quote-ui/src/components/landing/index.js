import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => (
  <div>
    <div>
      <nav>
        <div>
          <ul>
            <li><Link to='/'>The Quotefiles</Link></li>
          </ul>
        </div>
        <div>
          <ul>
            <li><Link to='/login'>Login</Link></li>
            <li><Link to='/signup'>Signup</Link></li>
          </ul>
        </div>
      </nav>
    </div>
  </div>
);


export default Landing;
