import axios from 'axios';
import firebaseConfig from '../apiKeys';

const dbURL = firebaseConfig.databaseURL;

// '/data.json' is a boilerplate endpoint

// Get request
const getData = () => new Promise((resolve, reject) => {
  axios.get(`${dbURL}/data.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

// Create request
const createData = (obj) => new Promise((resolve, reject) => {
  axios.post(`${dbURL}/data.json`, obj)
    .then((response) => {
      const body = { firebaseKey: response.data.name };
      axios.patch(`${dbURL}/data/${response.data.name}.json`, body)
        .then(() => {
          getData((resp) => resolve(resp));
        });
    })
    .catch((error) => reject(error));
});

// Delete request
const deleteData = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbURL}/data/${firebaseKey}.json`)
    .then(() => {
      getData((resp) => resolve(resp));
    })
    .catch((error) => reject(error));
});

const updateData = (obj) => new Promise((resolve, reject) => {
  axios.patch(`${dbURL}/data/${obj.firebaseKey}.json`, obj)
    .then(() => {
      getData((resp) => resolve(resp));
    })
    .catch((error) => reject(error));
});

export {
  getData, createData, deleteData, updateData
};
