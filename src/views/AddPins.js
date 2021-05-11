import React from 'react';
import PropTypes from 'prop-types';
import PinForm from '../components/PinForm';

function AddPin({ setPins, user }) {
  return (
    <div>
      <PinForm
        formTitle='Add Pin'
        setPins={setPins}
        user={user}
      />
    </div>
  );
}

AddPin.propTypes = {
  setPins: PropTypes.func.isRequired,
  user: PropTypes.any
};

export default AddPin;
