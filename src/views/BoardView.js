import React from 'react';
import PropTypes from 'prop-types';
import BoardCards from '../components/BoardCards';

export default function BoardView({
  boards, user, setBoards, setPins
}) {
  return (
    <div className="board-container">
      {boards.map((boardObj) => (
        <BoardCards
          key={boardObj.firebaseKey}
          user={user}
          setBoards={setBoards}
          setPins={setPins}
          {...boardObj}
        />
      ))}
    </div>
  );
}

BoardView.propTypes = {
  boards: PropTypes.array,
  setBoards: PropTypes.func.isRequired,
  user: PropTypes.any,
  setPins: PropTypes.func
};
