import React, { useState } from 'react';
import { Container, Row, Col, Card, Carousel } from 'react-bootstrap';
import './Testimonials.css';

const Testimonials = () => {
  const [index, setIndex] = useState(0);

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CEO at TechStart',
      image: '👩‍💼',
      content: 'Working with Nexus transformed our digital presence. Their team delivered beyond our expectations and helped us increase conversions by 150%.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Product Manager at InnovateCo',
      image: '👨‍💼',
      content: 'The mobile app they built for us received 4.8 stars on both app stores. Their attention to detail and user experience is exceptional.',
      rating: 5
    },
    {
      name: 'Emily Davis',
      role: 'Marketing Director at GrowthLab',
      image: '👩‍🎨',
      content: 'Outstanding service from start to finish. They understood our vision and brought it to life with beautiful design and flawless functionality.',
      rating: 5
    }
  ];

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const renderStars = (rating) => {
    return '⭐'.repeat(rating);
  };

  return (
    <section id="testimonials" className="testimonials-section py-5">
      <Container>
        <Row className="text-center mb-5">
          <Col>
            <h2 className="display-5 fw-bold mb-3">What Our Clients Say</h2>
            <p className="lead text-muted">
              Don't just take our word for it - hear from our satisfied clients
            </p>
          </Col>
        </Row>

        <Row>
          <Col lg={8} className="mx-auto">
            <Carousel 
              activeIndex={index} 
              onSelect={handleSelect}
              indicators={false}
              className="testimonial-carousel"
            >
              {testimonials.map((testimonial, idx) => (
                <Carousel.Item key={idx}>
                  <Card className="testimonial-card border-0 shadow">
                    <Card.Body className="p-5 text-center">
                      <div className="testimonial-image mb-4">
                        {testimonial.image}
                      </div>
                      <div className="testimonial-rating mb-3">
                        {renderStars(testimonial.rating)}
                      </div>
                      <blockquote className="testimonial-content mb-4">
                        "{testimonial.content}"
                      </blockquote>
                      <footer>
                        <strong className="testimonial-name d-block">
                          {testimonial.name}
                        </strong>
                        <small className="testimonial-role text-muted">
                          {testimonial.role}
                        </small>
                      </footer>
                    </Card.Body>
                  </Card>
                </Carousel.Item>
              ))}
            </Carousel>

            {/* Custom Indicators */}
            <div className="carousel-indicators-custom mt-4">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  className={`indicator ${index === idx ? 'active' : ''}`}
                  onClick={() => setIndex(idx)}
                />
              ))}
            </div>
          </Col>
        </Row>

        {/* Stats Row */}
        <Row className="mt-5 pt-5">
          <Col md={3} className="text-center mb-4">
            <div className="stat-number display-6 fw-bold text-primary">500+</div>
            <div className="stat-label text-muted">Projects Completed</div>
          </Col>
          <Col md={3} className="text-center mb-4">
            <div className="stat-number display-6 fw-bold text-primary">98%</div>
            <div className="stat-label text-muted">Client Satisfaction</div>
          </Col>
          <Col md={3} className="text-center mb-4">
            <div className="stat-number display-6 fw-bold text-primary">50+</div>
            <div className="stat-label text-muted">Team Members</div>
          </Col>
          <Col md={3} className="text-center mb-4">
            <div className="stat-number display-6 fw-bold text-primary">10+</div>
            <div className="stat-label text-muted">Years Experience</div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Testimonials;