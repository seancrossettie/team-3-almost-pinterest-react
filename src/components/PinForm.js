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
}) => {
  const [pin, setPin] = useState({
    pinTitle: pinTitle || '',
    pinDescription: pinDescription || '',
    imgUrl: imgUrl || '',
    firebaseKey: firebaseKey || null,
    uid: user.uid || null,
  });

  const handleInputChange = (e) => {
    setPin((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pin.firebaseKey) {
      updatePin(pin).then(setPins);
    } else {
      createPin(pin, user).then(setPins);

      // clear inputs
      setPin({
        pinTitle: '',
        pinDescription: '',
        imgUrl: '',
        firebaseKey: null,
        uid: null,
      });
    }
  };

  const handleBoardAssign = (e) => {
    e.preventDefault();
    console.warn(e.target.value);
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
          <Input type="select" name="select">
            <option value="">Select</option>
            {boards.map((boardObj) => (
                    <option
                      value={boardObj.firebaseKey}
                      key={boardObj.firebaseKey}
                      onClick={handleBoardAssign}
                    >
                      {boardObj.boardTitle}
                    </option>
            ))}
          </Input>
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
};

export default PinForm;
