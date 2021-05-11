import React from 'react';
import firebase from 'firebase';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import './styles/index.scss';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import firebaseConfig from './helpers/apiKeys';
import App from './components/App/App';

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.Fragment>
    <Router>
      <CssBaseline />
      <App />
    </Router>
  </React.Fragment>,
  document.getElementById('root')
);

reportWebVitals();
