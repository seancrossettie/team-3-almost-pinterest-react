import React from 'react';
import PropTypes from 'prop-types';
import '../App/Apps.scss';
import PinCard from '../components/PinCard';

function Pins({
  pins, setPins, user, boards
}) {
  return (
    <>
      <div className="board-container">
        {pins.map((pinInfo) => (
          <PinCard
            key={pinInfo.firebaseKey}
            firebaseKey={pinInfo.firebaseKey}
            pinTitle={pinInfo.pinTitle}
            pinDescription={pinInfo.pinDescription}
            imgUrl={pinInfo.imgUrl}
            setPins={setPins}
            privatePin={pinInfo.privatePin}
            boardId={pinInfo.boardId}
            uid={pinInfo.uid}
            user={user}
            boards={boards}
          />
        ))}
      </div>
    </>
  );
}

Pins.propTypes = {
  pins: PropTypes.array.isRequired,
  setPins: PropTypes.func.isRequired,
  user: PropTypes.any,
  boards: PropTypes.array
};

export default Pins;
