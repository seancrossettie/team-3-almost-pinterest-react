import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardImg, CardText, CardImgOverlay,
  CardTitle, Button
} from 'reactstrap';
// import { createPin, getPublicPins } from '../helpers/data/pinData';
import PublicForm from './PublicForm';

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
    if (user) {
      setShowForm((prevState) => !(prevState));
    } else {
      // eslint-disable-next-line no-alert
      window.alert('Please Sign In');
    }
  };

  return (
    <div>
      <Card className="m-4 board-card" key={firebaseKey} id={firebaseKey} inverse>
      <div className="img-div">
        <CardImg className="card-img" width="100%" src={imgUrl} alt={pinTitle} />
      </div>
      <div className="overlay"></div>
      <CardImgOverlay>
      <div className="card-content">
      <CardTitle tag="h5">{pinTitle}</CardTitle>
          <CardText>{pinDescription}</CardText>
          <Button color='danger' onClick={handleClick}>Pin This Public Pin</Button>
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
        </div>
      </CardImgOverlay>
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
