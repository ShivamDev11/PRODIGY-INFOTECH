import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    budget: '',
    message: ''
  });
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 5000);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      company: '',
      budget: '',
      message: ''
    });
  };

  const contactMethods = [
    {
      icon: '📧',
      title: 'Email Us',
      details: 'hello@nexus.com',
      description: 'Send us an email anytime'
    },
    {
      icon: '📞',
      title: 'Call Us',
      details: '+1 (555) 123-4567',
      description: 'Mon to Fri 9am to 6pm'
    },
    {
      icon: '📍',
      title: 'Visit Us',
      details: '123 Business Ave, City',
      description: 'Come say hello at our office'
    }
  ];

  return (
    <section id="contact" className="contact-section py-5 bg-light">
      <Container>
        <Row className="text-center mb-5">
          <Col>
            <h2 className="display-5 fw-bold mb-3">Get In Touch</h2>
            <p className="lead text-muted">
              Ready to start your project? Let's talk about your ideas
            </p>
          </Col>
        </Row>

        <Row>
          <Col lg={8} className="mb-5">
            <Card className="shadow-sm border-0">
              <Card.Body className="p-4">
                {showAlert && (
                  <Alert variant="success" className="mb-4">
                    Thank you for your message! We'll get back to you soon.
                  </Alert>
                )}
                
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Full Name *</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="Enter your full name"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Email Address *</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="Enter your email"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Company</Form.Label>
                        <Form.Control
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="Enter company name"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Project Budget</Form.Label>
                        <Form.Select
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                        >
                          <option value="">Select budget range</option>
                          <option value="1k-5k">$1,000 - $5,000</option>
                          <option value="5k-15k">$5,000 - $15,000</option>
                          <option value="15k-50k">$15,000 - $50,000</option>
                          <option value="50k+">$50,000+</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-4">
                    <Form.Label>Project Details *</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Tell us about your project..."
                    />
                  </Form.Group>

                  <Button 
                    type="submit" 
                    className="btn-primary-custom w-100 py-3"
                    size="lg"
                  >
                    Send Message
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4}>
            <div className="contact-info">
              <h4 className="mb-4">Contact Information</h4>
              <p className="text-muted mb-4">
                Have questions? We're here to help. Get in touch with us through 
                any of the following methods.
              </p>

              {contactMethods.map((method, index) => (
                <Card key={index} className="contact-method-card mb-3 border-0">
                  <Card.Body className="p-3">
                    <div className="d-flex align-items-center">
                      <div className="contact-icon me-3">
                        {method.icon}
                      </div>
                      <div>
                        <h6 className="mb-1">{method.title}</h6>
                        <p className="mb-1 fw-bold">{method.details}</p>
                        <small className="text-muted">{method.description}</small>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              ))}

              {/* Social Links */}
              <div className="social-links mt-4">
                <h6 className="mb-3">Follow Us</h6>
                <div className="d-flex gap-3">
                  {['📘', '🐦', '📷', '💼'].map((icon, index) => (
                    <Button
                      key={index}
                      variant="outline-primary"
                      className="social-btn rounded-circle"
                      size="sm"
                    >
                      <span style={{fontSize: '1.2rem'}}>{icon}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Contact;