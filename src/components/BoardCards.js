import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  Card, CardText, CardBody, CardLink,
  CardTitle
} from 'reactstrap';
import PropTypes from 'prop-types';
import { deleteBoard, getBoards } from '../helpers/data/data';

const BoardCards = ({
  user,
  firebaseKey,
  imgUrl,
  boardTitle,
  boardDescription,
  setBoards
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
        deleteBoard(firebaseKey, user)
          .then(setBoards);
        break;
      case 'show-pins':
        // console.warn('showed pins for this this board');
        history.push(`board/${firebaseKey}`);
        break;
      default:
        console.warn('No button clicked');
    }
  };

  return (
    <div>
      <Card key={firebaseKey}>
        <CardBody>
          <CardTitle tag="h5">{boardTitle}</CardTitle>
        </CardBody>
        <img width="100%" src={imgUrl} alt="Card image cap" />
        <CardBody>
          <CardText>{boardDescription}</CardText>
          <CardLink href="#" onClick={() => handleCardButton('edit')}>Edit</CardLink>
          <CardLink href="#" onClick={() => handleCardButton('delete')}>Delete</CardLink>
          <CardLink href="#" onClick={() => handleCardButton('show-pins')}>Pins</CardLink>
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
  user: PropTypes.any
};

export default BoardCards;
