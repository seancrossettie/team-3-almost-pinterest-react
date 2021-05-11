import axios from 'axios';
import firebaseConfig from '../apiKeys';

const dbURL = firebaseConfig.databaseURL;

// '/data.json' is a boilerplate endpoint

// Get Boards
const getBoards = () => new Promise((resolve, reject) => {
  axios.get(`${dbURL}/boards.json`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

// Create Boards
const createBoard = (obj) => new Promise((resolve, reject) => {
  axios.post(`${dbURL}/data.json`, obj)
    .then((response) => {
      const body = { firebaseKey: response.data.name };
      axios.patch(`${dbURL}/data/${response.data.name}.json`, body)
        .then(() => {
          getBoards((resp) => resolve(resp));
        });
    })
    .catch((error) => reject(error));
});

// Delete request
const deleteBoard = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbURL}/data/${firebaseKey}.json`)
    .then(() => {
      getBoards((resp) => resolve(resp));
    })
    .catch((error) => reject(error));
});

const updateBoard = (obj) => new Promise((resolve, reject) => {
  axios.patch(`${dbURL}/data/${obj.firebaseKey}.json`, obj)
    .then(() => {
      getBoards((resp) => resolve(resp));
    })
    .catch((error) => reject(error));
});

export {
  getBoards, createBoard, deleteBoard, updateBoard
};
