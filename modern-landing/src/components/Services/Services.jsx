import React from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import './Services.css';

const Services = () => {
  const services = [
    {
      icon: '💻',
      title: 'Web Development',
      description: 'Custom web applications built with modern technologies and best practices.',
      features: ['React/Vue.js', 'Node.js', 'MongoDB', 'Responsive Design'],
      price: '$2999',
      popular: false
    },
    {
      icon: '📱',
      title: 'Mobile App Development',
      description: 'Native and cross-platform mobile applications for iOS and Android.',
      features: ['React Native', 'Flutter', 'iOS/Android', 'App Store Deployment'],
      price: '$4999',
      popular: true
    },
    {
      icon: '🎨',
      title: 'UI/UX Design',
      description: 'Beautiful and intuitive user interfaces that enhance user experience.',
      features: ['Figma/Adobe XD', 'User Research', 'Prototyping', 'Design Systems'],
      price: '$1999',
      popular: false
    }
  ];

  return (
    <section id="services" className="services-section py-5 bg-light">
      <Container>
        <Row className="text-center mb-5">
          <Col>
            <Badge bg="primary" className="mb-3">Our Services</Badge>
            <h2 className="display-5 fw-bold mb-3">What We Offer</h2>
            <p className="lead text-muted">
              Comprehensive digital solutions tailored to your business needs
            </p>
          </Col>
        </Row>

        <Row>
          {services.map((service, index) => (
            <Col lg={4} md={6} className="mb-4" key={index}>
              <Card className={`service-card h-100 shadow-sm ${service.popular ? 'popular' : ''}`}>
                {service.popular && (
                  <div className="popular-badge">Most Popular</div>
                )}
                <Card.Body className="p-4">
                  <div className="service-icon mb-3">{service.icon}</div>
                  <Card.Title className="h4 mb-3">{service.title}</Card.Title>
                  <Card.Text className="text-muted mb-4">
                    {service.description}
                  </Card.Text>
                  
                  <ul className="service-features list-unstyled mb-4">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="mb-2">
                        <span className="feature-check">✓</span> {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="service-price mb-4">
                    <span className="price-amount display-6 fw-bold">{service.price}</span>
                    <span className="price-period text-muted">/project</span>
                  </div>
                  
                  <Button 
                    className={`w-100 ${service.popular ? 'btn-primary-custom' : 'btn-outline-primary'}`}
                    size="lg"
                  >
                    Get Started
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <Row className="mt-5">
          <Col className="text-center">
            <p className="text-muted mb-3">Need a custom solution?</p>
            <Button variant="outline-primary" size="lg">
              Contact Us for Custom Quote
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Services;