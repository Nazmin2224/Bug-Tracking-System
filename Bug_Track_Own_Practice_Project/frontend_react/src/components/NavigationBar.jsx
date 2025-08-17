// src/components/NavigationBar.jsx

import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './NavigationBar.css';

function NavigationBar() {
  return (
    <Navbar expand="lg" className="modern-navbar" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="brand">
          🐞 Bug Tracker
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto nav-links">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
            
            <Nav.Link as={Link} to="/contact">Contact Us</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
