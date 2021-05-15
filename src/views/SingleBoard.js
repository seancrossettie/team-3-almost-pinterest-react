import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams, Link } from 'react-router-dom';
import { Card, CardBody, Button } from 'reactstrap';
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

  return (
    <div className="m-4 pinBoard-container">
      <Button tag={Link} to='/boards' color="danger">Go Back to All Boards</Button>
      <h1>Pin belongs to {board.boardTitle} board</h1>
      <div className="board-container">
      {pinBoard.map((pinBoardArray) => (
        <Card className="board-card m-1" key={pinBoardArray.firebaseKey}>
          <CardBody>
            <h2>{pinBoardArray.pinTitle}</h2>
            <img width="100%" src={pinBoardArray.imgUrl}/>
            <p>{pinBoardArray.pinDescription}</p>
          </CardBody>
        </Card>
      ))}
      </div>
    </div>
  );
}

SingleBoard.propTypes = {
  id: PropTypes.string
};
