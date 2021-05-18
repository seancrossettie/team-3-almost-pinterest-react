import React, { useEffect, useState } from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';
import PublicPin from '../styles/PublicPin';
import { signInUser } from '../helpers/auth';
import { getPublicPins } from '../helpers/data/pinData';
import PublicPinCard from '../components/PublicPinCard';
import { signInGitHubUser } from '../helpers/authGitHub';
import GitHubLogo from '../assets/GitHubLogo.png';

export default function Home({ user, setPins, boards }) {
  const [publicPins, setPublicPins] = useState([]);

  useEffect(() => {
    if (user) {
      getPublicPins().then((data) => {
        const filtered = data.filter((array) => array.uid !== user.uid);
        setPublicPins(filtered);
      });
    } else {
      getPublicPins().then(setPublicPins);
    }
  }, []);

  return (
    <div className="home-text">
      { user
        ? <PublicPin>
          <h1>Hello, {user.fullName}</h1>
          <div className="home-text">
          {publicPins.map((publicPin) => (
            <PublicPinCard
              key={publicPin.firebaseKey}
              setPublicPins={setPublicPins}
              publicPins={publicPins}
              user={user}
              setPins={setPins}
              boards={boards}
              {...publicPin}
            />
          ))}
          </div>
          </PublicPin>
        : <div>
            <h1>Welcome</h1>
            <h1>To Pinterest!</h1>
            <h4>Sign in to get started</h4>
            <Button color='danger' onClick={signInUser}>Sign In</Button>
            <img className="redCard" onClick={signInGitHubUser} src={GitHubLogo}/>
            <div className="home-text">
            {publicPins.map((publicPin) => (
            <PublicPinCard
              key={publicPin.firebaseKey}
              setPublicPins={setPublicPins}
              publicPins={publicPins}
              user={user}
              setPins={setPins}
              boards={boards}
              {...publicPin}
            />
            ))}
          </div>
        </div>
      }
    </div>
  );
}

Home.propTypes = {
  user: PropTypes.any,
  setPins: PropTypes.func,
  boards: PropTypes.array
};
