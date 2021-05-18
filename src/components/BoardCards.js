import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Card, CardText, CardImgOverlay, CardLink,
  CardTitle, CardImg
} from 'reactstrap';
import PropTypes from 'prop-types';
import deleteBoardPins from '../helpers/data/pinBoardData';
import { getPins } from '../helpers/data/pinData';
import BoardForm from './BoardForm';

const BoardCards = ({
  user,
  firebaseKey,
  imgUrl,
  boardTitle,
  boardDescription,
  setBoards,
  privateBoard,
  setPins,
  uid
}) => {
  const [editing, setEditing] = useState(false);
  const history = useHistory();

  const handleCardButton = (type) => {
    switch (type) {
      case 'edit':
        console.warn(user);
        setEditing((prevState) => !prevState);
        break;
      case 'delete':
        deleteBoardPins(firebaseKey, user)
          .then(setBoards)
          .then(() => getPins(user))
          .then(setPins);
        break;
      case 'show-pins':
        history.push(`board/${firebaseKey}`);
        break;
      case 'share':
        history.push(`board/public/${firebaseKey}`);
        break;
      default:
        console.warn('No button clicked');
    }
  };

  return (
    <div>
      {
      editing ? <>
          <CardLink href="#" onClick={() => handleCardButton('edit')}>
            {editing ? 'Close Form' : 'Edit Board'}
          </CardLink>
          <BoardForm className='edit-form'
            formTitle='Edit Board'
            setBoards={setBoards}
            firebaseKey={firebaseKey}
            imgUrl={imgUrl}
            boardTitle={boardTitle}
            boardDescription={boardDescription}
            uid={uid}
            user={user}
            privateBoard={privateBoard}
          />
        </>
        : <Card className="m-4 board-card" inverse key={firebaseKey}>
            <div className="img-div">
              <CardImg className="card-img" width="100%" src={imgUrl} alt={boardTitle} />
            </div>
            <div className="overlay"></div>
            <CardImgOverlay>
            <div className="card-content">
              <CardTitle tag="h5">{boardTitle}</CardTitle>
              <CardText>{boardDescription}</CardText>
                  {(privateBoard === true) && <CardText className="text-danger"><i className="fas fa-user-secret"></i> Private Board</CardText>}
                  <CardLink href="#" onClick={() => handleCardButton('delete')}>Delete</CardLink>
                  <CardLink href="#" onClick={() => handleCardButton('show-pins')}>Pins</CardLink>
                  {!privateBoard && <CardLink href="#" onClick={() => handleCardButton('share')}>Share</CardLink>}
                  <CardLink href="#" onClick={() => handleCardButton('edit')}>
                  {editing ? 'Close Form' : 'Edit Board'}
                  </CardLink>
              </div>
            </CardImgOverlay>
          </Card>
      }
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
  privateBoard: PropTypes.bool,
  setPins: PropTypes.func,
  uid: PropTypes.any,
};

export default BoardCards;
