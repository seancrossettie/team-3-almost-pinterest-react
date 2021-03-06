import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  Button
} from 'reactstrap';
import { signOutUser } from '../helpers/auth';
// import { getPins } from '../helpers/data/pinData';

const NavBar = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const authenticated = () => (
    <>
            <NavItem>
              <Link className="nav-link" to="/pins">Pins</Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link" to="/boards">Boards</Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link" to="/add-boards">Add Boards</Link>
           </NavItem>
           <NavItem>
              <Link className="nav-link" to="/add-pins">Add Pins</Link>
           </NavItem>
    </>
  );

  return (
    <div>
      <Navbar color="light" light expand="md">
      <img className= "navbar-logo" src="https://logos-world.net/wp-content/uploads/2020/09/Pinterest-Logo.png"/>
      <Link className="navbar-brand" to="/">Home</Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
          { user && authenticated()}
            {
              user !== null
              && <NavItem>
                {
                  user
                    ? <Button color='danger' onClick={signOutUser}>Log Out</Button>
                    : ''
                }
              </NavItem>
            }
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

NavBar.propTypes = {
  user: PropTypes.any
};

export default NavBar;
