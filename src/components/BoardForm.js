import React, { useState } from 'react';
import {
  Button, Form, FormGroup, Label, Input, Card
} from 'reactstrap';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { createBoard, updateBoard } from '../helpers/data/data';

const BoardForm = ({
  formTitle,
  setBoards,
  boardTitle,
  boardDescription,
  imgUrl,
  firebaseKey,
  user,
  privateBoard,
}) => {
  const [board, setBoard] = useState({
    boardTitle: boardTitle || '',
    boardDescription: boardDescription || '',
    imgUrl: imgUrl || '',
    firebaseKey: firebaseKey || null,
    uid: user.uid || null,
    privateBoard: privateBoard || false
  });

  const handleInputChange = (e) => {
    setBoard((prevState) => ({
      ...prevState,
      [e.target.name]:
        e.target.name === 'privateBoard' ? e.target.checked : e.target.value,
    }));
  };

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (board.firebaseKey) {
      updateBoard(board, user).then(setBoards);
    } else {
      createBoard(board, user).then(setBoards);
      history.push('/boards');

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
            type='url'
            placeholder='Enter an Image URL'
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input
            type='checkbox'
            name='privateBoard'
            id='privateBoard'
            checked={board.privateBoard}
            onChange={handleInputChange}
            />
            Private ?
        </Label>
        </FormGroup>
        <Button type='submit'>Submit</Button>
      </Form>
      </Card>
    </div>
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
  user: PropTypes.any,
  privateBoard: PropTypes.bool,
  className: PropTypes.string

};

export default BoardForm;
