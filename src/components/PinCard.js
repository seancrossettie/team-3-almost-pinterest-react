import React, { useState } from 'react';
import {
  Card,
  CardText,
  CardTitle,
  CardImgOverlay,
  CardLink,
  CardImg
} from 'reactstrap';
import PropTypes from 'prop-types';
import { deletePin } from '../helpers/data/pinData';
import PinForm from './PinForm';

const PinCard = ({
  firebaseKey,
  pinTitle,
  pinDescription,
  imgUrl,
  uid,
  user,
  setPins,
  privatePin,
  boardId,
  boards
}) => {
  const [editing, setEditing] = useState(false);
  const handleClick = (type) => {
    switch (type) {
      case 'delete':
        deletePin(firebaseKey, user)
          .then(setPins);
        break;
      case 'edit':
        setEditing((prevState) => !prevState);
        break;
      default:
        console.warn('nothing selected');
    }
  };

  return (
    <div>
      {
    editing && <PinForm
      formTitle='Edit Pin'
      setPins={setPins}
      firebaseKey={firebaseKey}
      pinTitle={pinTitle}
      imgUrl={imgUrl}
      pinDescription={pinDescription}
      uid={uid}
      boardId={boardId}
      privatePin={privatePin}
      boards={boards}
      user={user}
    />}
     <Card className="m-4 board-card" key={firebaseKey} inverse>
      <div className="img-div">
        <CardImg className="card-img" width="100%" src={imgUrl} alt={pinTitle} />
      </div>
      <div className="overlay"></div>
      <CardImgOverlay>
      <div className="card-content">
          <CardTitle tag="h5">{pinTitle}</CardTitle>
          <CardText>{pinDescription}</CardText>
          {(privatePin === true) && <CardText className="text-danger"><i className="fas fa-user-secret"></i> Private Pin</CardText>}
          <div className='card-links'>
            <CardLink className="edit-link" href="#" onClick={() => handleClick('edit')}>Edit</CardLink>
            <CardLink className="delete-link" href="#" onClick={() => handleClick('delete')}>Delete</CardLink>
          </div>
      </div>
      </CardImgOverlay>
    </Card>
    </div>
  );
};

PinCard.propTypes = {
  firebaseKey: PropTypes.string,
  pinTitle: PropTypes.string,
  pinDescription: PropTypes.string,
  imgUrl: PropTypes.string,
  setPins: PropTypes.func,
  uid: PropTypes.any,
  user: PropTypes.any,
  privatePin: PropTypes.bool,
  boards: PropTypes.array,
  boardId: PropTypes.string
};

export default PinCard;
