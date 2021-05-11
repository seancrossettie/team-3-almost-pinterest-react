import React, { useState } from 'react';
import {
  Card, CardText, CardBody, CardLink,
  CardTitle
} from 'reactstrap';
import PropTypes from 'prop-types';
import { getBoards } from '../helpers/data/data';
import { getBoardPins } from '../helpers/data/pinData';
import PinCard from './PinCard';

const BoardCards = ({
  user,
  firebaseKey,
  imgUrl,
  boardTitle,
  boardDescription,
  setBoards
}) => {
  const [boardPins, setBoardPins] = useState([]);
  const [pinButton, setPinButton] = useState(false);

  const handleCardButton = (type) => {
    switch (type) {
      case 'edit':
        console.warn('edit this board');
        console.warn(user);
        getBoards().then(setBoards);
        break;
      case 'delete':
        console.warn('deleted this board');
        break;
      case 'show-pins':
        // console.warn('showed pins for this this board');
        setPinButton((prevState) => !prevState);
        getBoardPins(firebaseKey).then((data) => setBoardPins(data));
        console.warn(boardPins);
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
          {pinButton
            && <PinCard />
          }
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
