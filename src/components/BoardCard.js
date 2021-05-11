import React, { useState } from 'react';
import {
  Button,
  Card,
  CardText,
  CardTitle
} from 'reactstrap';
import PropTypes from 'prop-types';
import BoardForm from './BoardForm';

const BoardCard = ({
  firebaseKey,
  boardTitle,
  boardDescription,
  imgUrl,
  setBoards
}) => {
  const [editing, setEditing] = useState(false);
  const handleClick = (type) => {
    switch (type) {
      case 'delete':
        console.warn(firebaseKey);
        // // deleteBoard(firebaseKey)
        //   .then((boardArray) => setBoards(boardArray));
        break;
      case 'edit':
        setEditing((prevState) => !prevState);
        break;
      default:
        console.warn('nothing selected');
    }
  };

  return (
    <Card body>
      <CardTitle tag="h5">{boardTitle}</CardTitle>
      <img src={imgUrl} alt="Card image cap"/>
      <CardText>Description: {boardDescription}</CardText>
      <Button color="danger" onClick={() => handleClick('delete')}>Delete Board</Button>
      <Button color="info" onClick={() => handleClick('edit')}>
        {editing ? 'Close Form' : 'Edit Board'}
      </Button>
      {
      editing && <BoardForm
      formTitle='Edit Board'
      setBoards={setBoards}
      firebaseKey={firebaseKey}
      boardTitle={boardTitle}
      imgUrl={imgUrl}
      boardDescription={boardDescription}
      />}
      </Card>
  );
};

BoardCard.propTypes = {
  firebaseKey: PropTypes.string,
  boardTitle: PropTypes.string,
  boardDescription: PropTypes.string,
  imgUrl: PropTypes.string,
  setBoards: PropTypes.func
};

export default BoardCard;
