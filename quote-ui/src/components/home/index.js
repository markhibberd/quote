import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import logout from 'actions/logout';

const Landing = () => {
  const dispatch = useDispatch();
  const onLogout = useCallback(
    () => dispatch(logout()),
    [dispatch],
  );

  return (
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
              <li><button onClick={onLogout}>Logout</button></li>
            </ul>
          </div>
        </nav>
      </div>
      <div>Authenticated Stuff</div>
    </div>
  );
};


export default Landing;
