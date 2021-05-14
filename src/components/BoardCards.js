import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  Card, CardText, CardBody, CardLink,
  CardTitle
} from 'reactstrap';
import PropTypes from 'prop-types';
import { getBoards } from '../helpers/data/data';
import deleteBoardPins from '../helpers/data/pinBoardData';

const BoardCards = ({
  user,
  firebaseKey,
  imgUrl,
  boardTitle,
  boardDescription,
  setBoards,
  privateBoard
}) => {
  const history = useHistory();

  const handleCardButton = (type) => {
    switch (type) {
      case 'edit':
        console.warn('edit this board');
        console.warn(user);
        getBoards(user).then(setBoards);
        break;
      case 'delete':
        deleteBoardPins(firebaseKey, user).then(setBoards);
        break;
      case 'show-pins':
        history.push(`board/${firebaseKey}`);
        break;
      default:
        console.warn('No button clicked');
    }
  };

  return (
    <div>
      <Card className="m-4 board-card" key={firebaseKey}>
        <CardBody>
          <CardTitle tag="h5">{boardTitle}</CardTitle>
        </CardBody>
        <img width="100%" src={imgUrl} alt="Card image cap" />
        <CardBody>
          <CardText>{boardDescription}</CardText>
          {(privateBoard === true) && <CardText className="text-danger"><i className="fas fa-user-secret"></i> Private Board</CardText>}
          <div className='card-links'>
            <CardLink className="edit-link" href="#" onClick={() => handleCardButton('edit')}>Edit</CardLink>
            <CardLink className="delete-link" href="#" onClick={() => handleCardButton('delete')}>Delete</CardLink>
            <CardLink className="pins-link" href="#" onClick={() => handleCardButton('show-pins')}>Pins</CardLink>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

BoardCards.propTypes = {
  firebaseKey: PropTypes.string.isRequired,
  imgUrl: PropTypes.string,
  boardTitle: PropTypes.string,
  boardDescription: PropTypes.string,
  setBoards: PropTypes.func.isRequired,
  user: PropTypes.any,
  privateBoard: PropTypes.bool
};

export default BoardCards;
