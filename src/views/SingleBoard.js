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
    <div>
      <Button tag={Link} to='/boards' color="info">Go Back to All Boards</Button>
      <h1>Pin belongs to {board.boardTitle} board</h1>
      {pinBoard.map((pinBoardArray) => (
        <Card key={pinBoardArray.firebaseKey}>
          <CardBody>
            <h2>{pinBoardArray.pinTitle}</h2>
            <img src={pinBoardArray.imgUrl}/>
            <p>{pinBoardArray.pinDescription}</p>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}

SingleBoard.propTypes = {
  id: PropTypes.string
};
