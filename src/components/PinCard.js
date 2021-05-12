import React, { useState } from 'react';
import {
  Button,
  Card,
  CardText,
  CardTitle
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
  setPins
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
    <Card body>
      <CardTitle tag="h5">{pinTitle}</CardTitle>
      <img src={imgUrl} alt="Card image cap"/>
      <CardText>Description: {pinDescription}</CardText>
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
      />}
      </Card>
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
};

export default PinCard;
