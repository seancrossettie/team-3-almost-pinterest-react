import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Form, FormGroup, Label, Input
} from 'reactstrap';
import { createPin, getPins } from '../helpers/data/pinData';

export default function PublicForm({
  pinTitle,
  pinDescription,
  imgUrl,
  firebaseKey,
  user,
  privatePin,
  boardId,
  boards,
  setPublicPins,
  setPins
}) {
  const [publicPin, setPublicPin] = useState({
    pinTitle: pinTitle || '',
    pinDescription: pinDescription || '',
    imgUrl: imgUrl || '',
    firebaseKey: firebaseKey || null,
    uid: user.uid || null,
    boardId: boardId || null,
    privatePin: privatePin || false
  });

  const handleInputChange = (e) => {
    setPublicPin((prevState) => ({
      ...prevState,
      [e.target.name]:
        e.target.name === 'privatePin' ? e.target.checked : e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createPin(publicPin, user)
      .then(setPublicPins)
      .then(() => getPins(user))
      .then(setPins);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="exampleSelect">Select a Board</Label>
          <Input type="select" name="boardId" onChange={handleInputChange}>
            <option value="">Select</option>
            {boards.map((boardObj) => (
                    <option
                      value={boardObj.firebaseKey}
                      key={boardObj.firebaseKey}
                    >
                      {boardObj.boardTitle}
                    </option>
            ))}
        </Input>
      </FormGroup>
      <Button>Submit</Button>
    </Form>
  );
}

PublicForm.propTypes = {
  formTitle: PropTypes.string.isRequired,
  setPins: PropTypes.func,
  pinTitle: PropTypes.string,
  pinDescription: PropTypes.string,
  imgUrl: PropTypes.string,
  firebaseKey: PropTypes.string,
  uid: PropTypes.string,
  user: PropTypes.any,
  privatePin: PropTypes.bool,
  boards: PropTypes.array,
  boardId: PropTypes.string,
  setPublicPins: PropTypes.func
};
