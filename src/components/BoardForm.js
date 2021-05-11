import React, { useState } from 'react';
import {
  Button, Form, FormGroup, Label, Input, Card
} from 'reactstrap';
import PropTypes from 'prop-types';
import { createBoard, updateBoard } from '../helpers/data/data';

const BoardForm = ({
  formTitle,
  setBoards,
  boardTitle,
  boardDescription,
  imgUrl,
  firebaseKey,
  uid,
  user
}) => {
  const [board, setBoard] = useState({
    boardTitle: boardTitle || '',
    boardDescription: boardDescription || '',
    imgUrl: imgUrl || '',
    firebaseKey: firebaseKey || null,
    uid: user.uid || uid
  });

  const handleInputChange = (e) => {
    setBoard((prevState) => ({
      ...prevState,
      [e.target.name]:
        e.target.name === 'grade' ? Number(e.target.value) : e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (board.firebaseKey) {
      console.warn(firebaseKey);
      updateBoard(board).then(setBoards);
    } else {
      createBoard(board, user).then(setBoards);

      // clear inputs
      setBoard({
        boardTitle: '',
        boardDescription: '',
        imgUrl: '',
        firebaseKey: null,
        uid: null,
      });
    }
  };

  return (
    <>
    <div className='board-form'>
    <Card body>
      <Form id='addBoardForm' autoComplete='off' onSubmit={handleSubmit}>
        <h2>{formTitle}</h2>
        <FormGroup>
          <Label for="boardTitle">Title:</Label>
          <Input
            name='boardTitle'
            id='boardTitle'
            value={board.boardTitle}
            type='text'
            placeholder='Enter a Board Name'
            onChange={handleInputChange}
          />
        </FormGroup>

        <FormGroup>
          <Label for="boardDescription">Description:</Label>
          <Input
            name='boardDescription'
            id='boardDescription'
            value={board.boardDescription}
            type='text'
            placeholder='Enter a Board Description'
            onChange={handleInputChange}
          />
        </FormGroup>

        <FormGroup>
          <Label for="image">Board Image:</Label>
          <Input
            name='imgUrl'
            id='imgUrl'
            value={board.imgUrl}
            type='text'
            placeholder='Enter an Image URL'
            onChange={handleInputChange}
          />
        </FormGroup>

        <Button type='submit'>Submit</Button>
      </Form>
      </Card>
    </div>
    </>
  );
};

BoardForm.propTypes = {
  formTitle: PropTypes.string.isRequired,
  setBoards: PropTypes.func,
  boardTitle: PropTypes.string,
  boardDescription: PropTypes.string,
  imgUrl: PropTypes.string,
  firebaseKey: PropTypes.string,
  uid: PropTypes.string,
  user: PropTypes.any
};

export default BoardForm;
