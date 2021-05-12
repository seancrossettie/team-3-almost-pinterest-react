import React from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { signInUser } from '../helpers/auth';

export default function Home({ user }) {
  return (
    <div className="home-text">
      { user
        ? <h1>Hello, {user.fullName}</h1>
        : <div>
            <h1>Welcome</h1>
            <h1>To Pinterest!</h1>
            <h4>Sign in to get started</h4>
            <Button color='danger' onClick={signInUser}>Sign In</Button>
          </div>
      }
    </div>
  );
}

Home.propTypes = {
  user: PropTypes.any
};
