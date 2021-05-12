import React, { useState } from 'react';
import {
  Card,
  CardText,
  CardTitle,
  Button
} from 'reactstrap';
import PropTypes from 'prop-types';
import PinForm from './PinForm';
import { deletePin } from '../helpers/data/pinData';

const PinCard = ({
  firebaseKey,
  pinTitle,
  pinDescription,
  imgUrl,
  uid,
  user,
  setPins,
  privatePin
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
      <Card className="m-4 board-card" body>
        <CardTitle tag="h5">{pinTitle}</CardTitle>
        <img src={imgUrl} alt="Card image cap"/>
        <CardText>Description: {pinDescription}</CardText>
         {(privatePin === true) && <CardText className="text-danger"><i className="fas fa-user-secret"></i> Private Pin</CardText>}
        <Button color="danger" onClick={() => handleClick('delete')}>Delete Pin</Button>
        <Button color="info" onClick={() => handleClick('edit')}>
          {editing ? 'Close Form' : 'Edit Pin'}
        </Button>
        {
        editing && <PinForm
        formTitle='Edit Pin'
        setPins={setPins}
        firebaseKey={firebaseKey}
        pinTitle={pinTitle}
        imgUrl={imgUrl}
        pinDescription={pinDescription}
        uid={uid}
        user={user}
        privatePin={privatePin}
        />}
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
  privatePin: PropTypes.bool
};

export default PinCard;
