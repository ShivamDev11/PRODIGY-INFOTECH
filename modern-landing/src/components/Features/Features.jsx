import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './Features.css';

const Features = () => {
  const features = [
    {
      icon: '⚡',
      title: 'Lightning Fast',
      description: 'Optimized for speed and performance with cutting-edge technology.'
    },
    {
      icon: '🔒',
      title: 'Secure & Safe',
      description: 'Enterprise-grade security to protect your data and privacy.'
    },
    {
      icon: '🎨',
      title: 'Beautiful Design',
      description: 'Stunning, modern designs that captivate your audience.'
    },
    {
      icon: '📱',
      title: 'Mobile First',
      description: 'Perfect experience on all devices and screen sizes.'
    },
    {
      icon: '🚀',
      title: 'Easy to Use',
      description: 'Intuitive interface that requires no technical knowledge.'
    },
    {
      icon: '🔧',
      title: 'Customizable',
      description: 'Flexible and adaptable to your specific needs.'
    }
  ];

  return (
    <section id="features" className="features-section py-5">
      <Container>
        <Row className="text-center mb-5">
          <Col>
            <h2 className="display-4 fw-bold mb-3">Amazing Features</h2>
            <p className="lead text-muted">
              Discover the powerful features that make our platform stand out from the rest
            </p>
          </Col>
        </Row>
        
        <Row>
          {features.map((feature, index) => (
            <Col lg={4} md={6} className="mb-4" key={index}>
              <Card className="feature-card h-100 border-0 shadow-sm">
                <Card.Body className="text-center p-4">
                  <div className="feature-icon mb-3">{feature.icon}</div>
                  <Card.Title className="h5">{feature.title}</Card.Title>
                  <Card.Text className="text-muted">{feature.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Features;