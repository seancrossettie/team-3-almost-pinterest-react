import React from 'react';
import PropTypes from 'prop-types';
import BoardForm from '../components/BoardForm';

function AddBoard({ setBoards, user }) {
  return (
    <div>
      <BoardForm
        formTitle='Add Board'
        setBoards={setBoards}
        user={user}
      />
    </div>
  );
}

AddBoard.propTypes = {
  setBoards: PropTypes.func.isRequired,
  user: PropTypes.any
};

export default AddBoard;
