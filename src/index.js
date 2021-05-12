import React from 'react';
import firebase from 'firebase';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.scss';
import reportWebVitals from './reportWebVitals';
import firebaseConfig from './helpers/apiKeys';
import App from './App';

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.Fragment>
    <Router>
      <App />
    </Router>
  </React.Fragment>,
  document.getElementById('root')
);

reportWebVitals();
