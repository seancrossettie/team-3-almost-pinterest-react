import axios from 'axios';
import firebaseConfig from '../apiKeys';

const dbURL = firebaseConfig.databaseURL;

// Get request
const getPins = (user) => new Promise((resolve, reject) => {
  axios.get(`${dbURL}/pins.json?orderBy="uid"&equalTo="${user.uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    }).catch((error) => reject(error));
});

// Get Public Pins
const getPublicPins = () => new Promise((resolve, reject) => {
  axios.get(`${dbURL}/pins.json?orderBy="private"&equalTo=false`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

// GET SINGLE PIN
const getSinglePin = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbURL}/pins/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

// Create request
const createPin = (pinObj, user) => new Promise((resolve, reject) => {
  axios.post(`${dbURL}/pins.json`, pinObj)
    .then((response) => {
      const body = { firebaseKey: response.data.name };
      axios.patch(`${dbURL}/pins/${response.data.name}.json`, body)
        .then(() => {
          getPins(user).then((resp) => resolve(resp));
        });
    })
    .catch((error) => reject(error));
});

// Delete request
const deletePin = (firebaseKey, user) => new Promise((resolve, reject) => {
  axios.delete(`${dbURL}/pins/${firebaseKey}.json`)
    .then(() => getPins(user).then((resp) => resolve(resp)))
    .catch((error) => reject(error));
});

// Update request
const updatePin = (pin, user) => new Promise((resolve, reject) => {
  axios.patch(`${dbURL}/pins/${pin.firebaseKey}.json`, pin)
    .then(() => getPins(user).then((resp) => resolve(resp)))
    .catch((error) => reject(error));
});

// Get pins belong to a board
const getBoardPins = (boardId) => new Promise((resolve, reject) => {
  axios.get(`${dbURL}/pins.json?orderBy="boardId"&equalTo="${boardId}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

export {
  getPins, createPin, deletePin, updatePin, getSinglePin, getBoardPins, getPublicPins
};
