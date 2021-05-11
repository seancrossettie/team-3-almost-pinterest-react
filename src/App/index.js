import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import './Apps.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from '../helpers/Routes';
import NavBar from '../components/NavBar';
import { getPins } from '../helpers/data/pinData';
import { getBoards } from '../helpers/data/data';

function App() {
  // This hook maintains state of user in app, the absense of which resulting in the state of null
  const [user, setUser] = useState(null);
  const [pins, setPins] = useState([]);

  useEffect(() => {
    getPins().then(setPins);
  }, []);
  const [boards, setBoards] = useState([]);

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

  useEffect(() => {
    getBoards().then(setBoards);
  }, []);

  return (
    <>
     <Router>
      <NavBar user={user} />
      <Routes
      user={user}
      pins={pins}
      setPins={setPins}
      boards={boards}
      setBoards={setBoards}
        />
      </Router>
    </>
  );
}

export default App;
