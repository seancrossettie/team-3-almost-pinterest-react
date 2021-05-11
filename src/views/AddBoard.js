import React from 'react';
import PropTypes from 'prop-types';
import BoardForm from '../components/BoardForm';

function AddBoard({ setBoards }) {
  return (
    <div>
      <BoardForm
        formTitle='Add Board'
        setBoards={setBoards}
      />
    </div>
  );
}

AddBoard.propTypes = {
  setBoards: PropTypes.func.isRequired
};

export default AddBoard;
