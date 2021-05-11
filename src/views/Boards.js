import React from 'react';
import PropTypes from 'prop-types';
import BoardCard from '../components/BoardCard';
import BoardForm from '../components/BoardForm';
import '../App/Apps.scss';

function Boards({ boards, setBoards }) {
  return (
    <>
      <BoardForm
        formTitle='Add Board'
        setBoards={setBoards}
      />
      <hr/>
      <div className="card-container">
        {boards.map((boardInfo) => (
          <BoardCard
            key={boardInfo.firebaseKey}
            firebaseKey={boardInfo.firebaseKey}
            boardTitle={boardInfo.boardTitle}
            boardDescription={boardInfo.boardDescription}
            imgUrl={boardInfo.imgUrl}
            setBoards={setBoards}
          />
        ))}
      </div>
    </>
  );
}

Boards.propTypes = {
  boards: PropTypes.array.isRequired,
  setBoards: PropTypes.func.isRequired,
};

export default Boards;
