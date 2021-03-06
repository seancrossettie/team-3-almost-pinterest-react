import axios from 'axios';
import firebaseConfig from '../apiKeys';

const dbURL = firebaseConfig.databaseURL;

// '/data.json' is a boilerplate endpoint

// Get Boards
const getBoards = (user) => new Promise((resolve, reject) => {
  axios.get(`${dbURL}/boards.json?orderBy="uid"&equalTo="${user.uid}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

// Get Public Boards
const getPublicBoards = () => new Promise((resolve, reject) => {
  axios.get(`${dbURL}/boards.json?orderBy="privateBoard"&equalTo=false`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

// Get Single Board
const getSingleBoard = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbURL}/boards/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

// Create Boards
const createBoard = (obj, user) => new Promise((resolve, reject) => {
  axios.post(`${dbURL}/boards.json`, obj)
    .then((response) => {
      const body = { firebaseKey: response.data.name };
      axios.patch(`${dbURL}/boards/${response.data.name}.json`, body)
        .then(() => {
          getBoards(user).then((resp) => resolve(resp));
        });
    })
    .catch((error) => reject(error));
});

// Delete request
const deleteBoard = (firebaseKey, user) => new Promise((resolve, reject) => {
  axios.delete(`${dbURL}/boards/${firebaseKey}.json`)
    .then(() => getBoards(user).then((resp) => resolve(resp)))
    .catch((error) => reject(error));
});

const updateBoard = (obj, user) => new Promise((resolve, reject) => {
  axios.patch(`${dbURL}/boards/${obj.firebaseKey}.json`, obj)
    .then(() => getBoards(user).then((resp) => resolve(resp)))
    .catch((error) => reject(error));
});

export {
  getBoards, getSingleBoard, createBoard, deleteBoard, updateBoard, getPublicBoards
};
