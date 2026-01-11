import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import './Hero.css';

const Hero = () => {
  return (
    <section id="home" className="hero-section">
      <Container>
        <Row className="align-items-center min-vh-100">
          <Col lg={6} className="hero-content">
            <h1 className="hero-title mb-4">
              Build Your Dream
              <span className="gradient-text"> Digital Experience</span>
            </h1>
            <p className="hero-description lead mb-4">
              Transform your ideas into stunning digital solutions with our cutting-edge 
              technology and creative expertise. Join thousands of satisfied clients worldwide.
            </p>
            <div className="hero-actions mb-5">
              <Button className="btn-primary-custom me-3 mb-2">
                Get Started Free
              </Button>
              <Button variant="outline-light" className="mb-2">
                <span className="play-icon me-2">▶</span>
                Watch Demo
              </Button>
            </div>
            <Row className="hero-stats">
              <Col xs={4} className="text-center">
                <div className="stat-number">10K+</div>
                <div className="stat-label">Happy Clients</div>
              </Col>
              <Col xs={4} className="text-center">
                <div className="stat-number">50K+</div>
                <div className="stat-label">Projects Done</div>
              </Col>
              <Col xs={4} className="text-center">
                <div className="stat-number">98%</div>
                <div className="stat-label">Success Rate</div>
              </Col>
            </Row>
          </Col>
          
          <Col lg={6} className="hero-visual">
            <div className="position-relative h-100">
              {/* Floating Cards */}
              <Card className="floating-card card-1">
                <Card.Body className="text-center">
                  <div className="card-icon mb-3">💫</div>
                  <Card.Title>Fast Performance</Card.Title>
                  <Card.Text className="small">Lightning fast loading times</Card.Text>
                </Card.Body>
              </Card>
              
              <Card className="floating-card card-2">
                <Card.Body className="text-center">
                  <div className="card-icon mb-3">🔒</div>
                  <Card.Title>Secure & Safe</Card.Title>
                  <Card.Text className="small">Enterprise-grade security</Card.Text>
                </Card.Body>
              </Card>
              
              <Card className="floating-card card-3">
                <Card.Body className="text-center">
                  <div className="card-icon mb-3">🚀</div>
                  <Card.Title>Easy to Use</Card.Title>
                  <Card.Text className="small">Intuitive user interface</Card.Text>
                </Card.Body>
              </Card>
              
              {/* Main Visual */}
              <div className="main-visual">
                <div className="visual-background"></div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Hero;