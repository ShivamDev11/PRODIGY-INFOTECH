import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import './Header.css';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Navbar 
      expand="lg" 
      fixed="top" 
      className={`custom-navbar ${scrolled ? 'scrolled' : ''}`}
      variant="dark"
    >
      <Container>
        <Navbar.Brand href="#home" className="d-flex align-items-center">
          <span className="logo-icon me-2">🚀</span>
          <strong>Nexus</strong>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link href="#home" className="nav-link-custom">Home</Nav.Link>
            <Nav.Link href="#features" className="nav-link-custom">Features</Nav.Link>
            <Nav.Link href="#about" className="nav-link-custom">About</Nav.Link>
            <Nav.Link href="#services" className="nav-link-custom">Services</Nav.Link>
            <Nav.Link href="#testimonials" className="nav-link-custom">Testimonials</Nav.Link>
            <Nav.Link href="#contact" className="nav-link-custom">Contact</Nav.Link>
          </Nav>
          
          <div className="d-flex gap-2">
            <Button variant="outline-light" className="me-2">Login</Button>
            <Button className="btn-primary-custom">Get Started</Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;