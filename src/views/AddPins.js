import React from 'react';
import PropTypes from 'prop-types';
import PinForm from '../components/PinForm';

function AddPin({ setPins }) {
  return (
    <div>
      <PinForm
        formTitle='Add Pin'
        setPins={setPins}
      />
    </div>
  );
}

AddPin.propTypes = {
  setPins: PropTypes.func.isRequired
};

export default AddPin;
