import React, { useState } from 'react';
import {
  Button, Form, FormGroup, Label, Input, Card, Dropdown, DropdownToggle, DropdownMenu, DropdownItem
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
    uid: user.uid || null
  });

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const handleInputChange = (e) => {
    setPin((prevState) => ({
      ...prevState,
      [e.target.name]:
        e.target.name === 'grade' ? Number(e.target.value) : e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pin.firebaseKey) {
      console.warn(firebaseKey);
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
          <Dropdown isOpen={dropdownOpen} toggle={toggle} className='mb-3'>
            <DropdownToggle caret>
              Assign to a Board
            </DropdownToggle>
            <DropdownMenu>
              {boards.map((boardObj) => (
                <DropdownItem key={boardObj.firebaseKey}>{boardObj.boardTitle}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
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
