import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, Button
} from 'reactstrap';
// import { createPin, getPublicPins } from '../helpers/data/pinData';
import PublicForm from './PublicForm';
import ModalLink from './ModalLink';

export default function PublicPinCard({
  imgUrl,
  pinTitle,
  pinDescription,
  firebaseKey,
  user,
  setPins,
  uid,
  boardId,
  privatePin,
  boards
}) {
  const [showForm, setShowForm] = useState(false);

  const handleClick = () => {
    setShowForm((prevState) => !(prevState));
  };

  return (
    <div className="m-4 board-card">
      <Card key={firebaseKey} id={firebaseKey}>
        <CardImg top width="100%" src={imgUrl} alt={pinTitle} />
        <CardBody>
          <CardTitle tag="h5">{pinTitle}</CardTitle>
          <CardText>{pinDescription}</CardText>
          {user ? <Button color='danger' onClick={handleClick}>Pin This Public Pin</Button>
            : <ModalLink />}
          {showForm && <PublicForm
            formTitle='Pin This?'
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
        </CardBody>
      </Card>
    </div>
  );
}

PublicPinCard.propTypes = {
  imgUrl: PropTypes.string,
  pinTitle: PropTypes.string.isRequired,
  pinDescription: PropTypes.string.isRequired,
  firebaseKey: PropTypes.string.isRequired,
  user: PropTypes.any,
  uid: PropTypes.string,
  setPins: PropTypes.func,
  setPublicPins: PropTypes.func,
  privatePin: PropTypes.bool,
  boardId: PropTypes.string,
  boards: PropTypes.array
};
