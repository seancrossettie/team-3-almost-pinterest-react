import React from 'react';
import PropTypes from 'prop-types';
import BoardCards from '../components/BoardCards';

export default function BoardView({ boards, user, setBoards }) {
  return (
    <div>
      {boards.map((boardObj) => (
        <BoardCards
          key={boardObj.firebaseKey}
          user={user}
          setBoards={setBoards}
          {...boardObj}
        />
      ))}
    </div>
  );
}

BoardView.propTypes = {
  boards: PropTypes.array,
  setBoards: PropTypes.func.isRequired,
  user: PropTypes.any
};
