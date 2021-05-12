import React from 'react';
import PropTypes from 'prop-types';
import PinForm from '../components/PinForm';

function AddPin({ setPins, user, boards }) {
  return (
    <div>
      <PinForm
        formTitle='Add Pin'
        setPins={setPins}
        user={user}
        boards={boards}
      />
    </div>
  );
}

AddPin.propTypes = {
  setPins: PropTypes.func.isRequired,
  user: PropTypes.any,
  boards: PropTypes.array.isRequired
};

export default AddPin;
