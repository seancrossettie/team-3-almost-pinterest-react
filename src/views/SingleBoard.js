import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams, Link } from 'react-router-dom';
import {
  Card, CardImgOverlay, Button, CardText, CardTitle, CardImg
} from 'reactstrap';
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
      <Card className="m-4 board-card" inverse>
        <div className="img-div">
          <CardImg className="card-img-board" width="100%" src={board.imgUrl} alt={board.boardTitle} />
        </div>
        <div className="overlay"></div>
        <CardImgOverlay>
        <div className="card-content">
          <CardTitle tag="h5">{board.boardTitle}</CardTitle>
          <CardText>{board.boardDescription}</CardText>
        </div>
        </CardImgOverlay>
      </Card>
      <h2>Pin belongs to {board.boardTitle} board</h2>
      <div className="board-container">
      {pinBoard.map((pinBoardArray) => (
        <Card className="m-4 board-card" key={pinBoardArray.firebaseKey} inverse>
        <div className="img-div">
          <CardImg className="card-img" width="100%" src={pinBoardArray.imgUrl} />
        </div>
        <div className="overlay"></div>
        <CardImgOverlay>
        <div className="card-content">
          <CardTitle tag="h5">{pinBoardArray.pinTitle}</CardTitle>
          <CardText>{pinBoardArray.pinDescription}</CardText>
        </div>
        </CardImgOverlay>
      </Card>
      ))}
      </div>
    </div>
  );
}

SingleBoard.propTypes = {
  id: PropTypes.string
};
