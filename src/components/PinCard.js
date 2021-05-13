import React, { useState } from 'react';
import {
  Card,
  CardText,
  CardTitle,
  CardBody,
  CardLink
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
      <Card className="m-4 board-card" key={firebaseKey}>
        <CardBody>
          <CardTitle tag="h5">{pinTitle}</CardTitle>
        </CardBody>
        <img width="100%" src={imgUrl} alt="Card image cap" />
        <CardBody>
          <CardText>{pinDescription}</CardText>
          {(privatePin === true) && <CardText className="text-danger"><i className="fas fa-user-secret"></i> Private Pin</CardText>}
          <div className='card-links'>
            <CardLink className="edit-link" href="#" onClick={() => handleClick('edit')}>Edit</CardLink>
            <CardLink className="delete-link" href="#" onClick={() => handleClick('delete')}>Delete</CardLink>
          </div>
          {
          editing && <PinForm
            formTitle='Edit Pin'
            setPins={setPins}
            firebaseKey={firebaseKey}
            pinTitle={pinTitle}
            imgUrl={imgUrl}
            pinDescription={pinDescription}
            uid={uid}
            privatePin={privatePin}
            boards={boards}
            user={user}
          />}
        </CardBody>
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
};

export default PinCard;
