import React from 'react';
import { Navbar } from 'react-bootstrap';

const Header = ({title}) => {

  return (
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="#">{title}</a>
        </Navbar.Brand>
      </Navbar.Header>
    </Navbar>
  );
}

export default Header;
