import React, { useState } from 'react';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import { signInGitHubUser } from '../helpers/authGitHub';
import { signInUser } from '../helpers/auth';
import GitHubLogo from '../assets/GitHubLogo.png';

export default function ModalLink() {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="danger" onClick={toggle}>Pin This Public Pin</Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>SIGN IN REQUIRED</ModalHeader>
        <ModalBody>
          I am sorry but you need to sign in.
        </ModalBody>
        <ModalFooter>
          <Button color='danger' onClick={signInUser}>Sign In</Button>
          <img className="redCard" onClick={signInGitHubUser} src={GitHubLogo}/>
        </ModalFooter>
      </Modal>
    </div>
  );
}
