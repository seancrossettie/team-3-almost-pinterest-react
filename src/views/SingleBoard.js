import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { Card } from 'reactstrap';
import { getSingleBoard } from '../helpers/data/data';
import { getBoardPins } from '../helpers/data/pinData';

export default function SingleBoard() {
  const [board, setBoard] = useState({});
  const [pinBoard, setPinBoard] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getSingleBoard(id).then(setBoard);
    getBoardPins(id).then((data) => setPinBoard(data));
  }, []);

  console.warn(pinBoard);

  return (
    <div>
      <h1>Pin belongs to {board.boardTitle} board</h1>
      {pinBoard.map((pinBoardArray) => (
        <Card key={pinBoardArray.firebaseKey}>
          <h2>{pinBoardArray.pinTitle}</h2>
          <img src={pinBoardArray.imgUrl}/>
          <p>{pinBoardArray.pinDescription}</p>
        </Card>
      ))}
    </div>
  );
}

SingleBoard.propTypes = {
  id: PropTypes.string
};
