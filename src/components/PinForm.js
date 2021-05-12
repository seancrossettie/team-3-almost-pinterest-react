import React, { useState } from 'react';
import {
  Button, Form, FormGroup, Label, Input, Card
} from 'reactstrap';
import PropTypes from 'prop-types';
import { createPin, updatePin } from '../helpers/data/pinData';

const PinForm = ({
  formTitle,
  setPins,
  pinTitle,
  pinDescription,
  imgUrl,
  firebaseKey,
  user,
  boards,
  privatePin
}) => {
  const [pin, setPin] = useState({
    pinTitle: pinTitle || '',
    pinDescription: pinDescription || '',
    imgUrl: imgUrl || '',
    firebaseKey: firebaseKey || null,
    uid: user.uid || null,
    privatePin: privatePin || false
  });

  const handleInputChange = (e) => {
    setPin((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
      [e.target.name]: e.target.name === 'privatePin' ? e.target.checked : e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pin.firebaseKey) {
      updatePin(pin).then(setPins);
    } else {
      createPin(pin, user).then(setPins);
    }
  };

  const handleBoardAssign = (e) => {
    e.preventDefault();
  };

  return (
    <>
    <div className='pin-form'>
    <Card body>
      <Form id='addPinForm' autoComplete='off' onSubmit={handleSubmit}>
        <h2>{formTitle}</h2>
        <FormGroup>
          <Label for="pinTitle">Title:</Label>
          <Input
            name='pinTitle'
            id='pinTitle'
            value={pin.pinTitle}
            type='text'
            placeholder='Enter a Pin Name'
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="pinDescription">Description:</Label>
          <Input
            name='pinDescription'
            id='pinDescription'
            value={pin.pinDescription}
            type='text'
            placeholder='Enter a Pin Description'
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="image">Pin Image:</Label>
          <Input
            name='imgUrl'
            id='imgUrl'
            value={pin.imgUrl}
            type='text'
            placeholder='Enter an Image URL'
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="exampleSelect">Select a Board</Label>
          <Input type="select" name="select" onClick={handleBoardAssign}>
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
        <FormGroup check>
          <Label check>
            <Input
            type='checkbox'
            name='privatePin'
            id='privatePin'
            checked={pin.privatePin}
            onChange={handleInputChange}
                />
            Private ?
        </Label>
        </FormGroup>
        <Button type='submit'>Submit</Button>
      </Form>
      </Card>
    </div>
    </>
  );
};

PinForm.propTypes = {
  formTitle: PropTypes.string.isRequired,
  setPins: PropTypes.func,
  pinTitle: PropTypes.string,
  pinDescription: PropTypes.string,
  imgUrl: PropTypes.string,
  firebaseKey: PropTypes.string,
  uid: PropTypes.string,
  user: PropTypes.any,
  boards: PropTypes.array.isRequired,
  pins: PropTypes.array,
  privatePin: PropTypes.bool
};

export default PinForm;
