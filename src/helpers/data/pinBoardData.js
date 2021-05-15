import { deleteBoard } from './data';
import { deletePin, getBoardPins } from './pinData';

const deleteBoardPins = (firebaseKey, user) => new Promise((resolve, reject) => {
  getBoardPins(firebaseKey).then((pinBoardArray) => {
    const deletePins = pinBoardArray.map((pin) => deletePin(pin.firebaseKey, user));
    Promise.all(deletePins).then(() => resolve(deleteBoard(firebaseKey, user)));
  }).catch((error) => reject(error));
});

export default deleteBoardPins;
