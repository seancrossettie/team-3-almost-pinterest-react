import axios from 'axios';
import firebaseConfig from '../apiKeys';

const dbURL = firebaseConfig.databaseURL;

const getUsers = () => new Promise((resolve, reject) => {
  axios.get(`${dbURL}/users.json`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

const createUser = (user) => new Promise((resolve, reject) => {
  axios.get(`${dbURL}/users.json?orderBy="uid"&equalTo="${user.uid}"`)
    .then((response) => {
      if (!Object.values(response.data).length) {
        const userObj = {
          uid: user.uid,
          displayName: user.displayName,
          image: user.photoURL,
          email: user.email,
        };
        axios.post(`${dbURL}/users.json`, userObj)
          .then((userResponse) => {
            axios.patch(`${dbURL}/users/${userResponse.data.name}.json`, { firebaseKey: userResponse.data.name });
          })
          .catch((error) => reject(error));
      }
    });
});

export { getUsers, createUser };
