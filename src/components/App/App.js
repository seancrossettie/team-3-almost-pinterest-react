import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import './App.scss';
import Routes from '../helpers/Routes';

function App() {
  // This hook maintains state of user in app, the absense of which resulting in the state of null
  const [user, setUser] = useState(null);

  // Authentication for Firebase on initial render
  useEffect(() => {
    firebase.auth().onAuthStateChanged((authed) => {
      if (authed) {
        const userObj = {
          fullName: authed.displayName,
          profileImage: authed.photoURL,
          uid: authed.uid,
          user: authed.email.split('@')[0]
        };
        setUser(userObj);
      } else if (user || user === null) {
        setUser(false);
      }
    });
  }, []);

  return (
    <>
      <Routes />
      <h1>React Template</h1>
    </>
  );
}

export default App;
