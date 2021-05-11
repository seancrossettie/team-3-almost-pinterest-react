import React from 'react';
import PropTypes from 'prop-types';
import '../App/Apps.scss';
import PinCard from '../components/PinCard';

function Pins({ pins, setPins }) {
  return (
    <>
      <div className="card-container">
        {pins.map((pinInfo) => (
          <PinCard
            key={pinInfo.firebaseKey}
            firebaseKey={pinInfo.firebaseKey}
            pinTitle={pinInfo.pinTitle}
            pinDescription={pinInfo.pinDescription}
            imgUrl={pinInfo.imgUrl}
            setPins={setPins}
            private={pinInfo.private}
            boardId={pinInfo.boardId}
            uid={pinInfo.uid}
          />
        ))}
      </div>
    </>
  );
}

Pins.propTypes = {
  pins: PropTypes.array.isRequired,
  setPins: PropTypes.func.isRequired,
};

export default Pins;
