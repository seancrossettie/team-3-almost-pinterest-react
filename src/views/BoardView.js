import React from 'react';
import PropTypes from 'prop-types';
import BoardCards from '../components/BoardCards';

const BoardView = ({ boards, user, setBoards }) => (
    <div className="board-container">
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

BoardView.propTypes = {
  boards: PropTypes.array,
  setBoards: PropTypes.func.isRequired,
  user: PropTypes.any
};

export default BoardView;
