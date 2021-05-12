import { deleteBoard } from './data';
import { getBoardPins } from './pinData';

const deleteBoardPins = (boardId) => new Promise((resolve, reject) => {
  getBoardPins(boardId).then((pinBoardArray) => {
    const deletePins = pinBoardArray.map((pin) => deletePins(pin.firebaseKey));
    Promise.all(deletePins).then(() => resolve(deleteBoard(boardId)));
  }).catch((error) => reject(error));
});

export default deleteBoardPins;
