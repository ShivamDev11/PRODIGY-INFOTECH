import React from 'react';
import { Container, Row, Col, ProgressBar, Button } from 'react-bootstrap';
import './About.css';

const About = () => {
  const skills = [
    { name: 'Web Development', percentage: 95 },
    { name: 'UI/UX Design', percentage: 88 },
    { name: 'Mobile Development', percentage: 92 },
    { name: 'Digital Marketing', percentage: 85 }
  ];

  return (
    <section id="about" className="about-section py-5">
      <Container>
        <Row className="align-items-center">
          <Col lg={6} className="mb-4 mb-lg-0">
            <h2 className="display-5 fw-bold mb-4">About Our Company</h2>
            <p className="lead mb-4">
              We are a team of passionate developers, designers, and digital experts 
              dedicated to creating exceptional digital experiences that drive results.
            </p>
            <p className="mb-4">
              With over 10 years of experience in the industry, we've helped hundreds 
              of businesses transform their digital presence and achieve their goals.
            </p>
            
            <Row className="mb-4">
              {skills.map((skill, index) => (
                <Col md={6} key={index} className="mb-3">
                  <div className="skill-item">
                    <div className="d-flex justify-content-between mb-2">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-percentage">{skill.percentage}%</span>
                    </div>
                    <ProgressBar 
                      now={skill.percentage} 
                      className="skill-progress"
                    />
                  </div>
                </Col>
              ))}
            </Row>
            
            <Button className="btn-primary-custom">Learn More</Button>
          </Col>
          
          <Col lg={6}>
            <Row className="g-3">
              <Col md={6}>
                <div className="about-card text-center p-4 rounded-3 shadow-sm">
                  <div className="about-icon mb-3">🏆</div>
                  <h5>Award Winning</h5>
                  <p className="small text-muted mb-0">Multiple industry awards</p>
                </div>
              </Col>
              <Col md={6}>
                <div className="about-card text-center p-4 rounded-3 shadow-sm">
                  <div className="about-icon mb-3">👥</div>
                  <h5>Expert Team</h5>
                  <p className="small text-muted mb-0">50+ professionals</p>
                </div>
              </Col>
              <Col md={6}>
                <div className="about-card text-center p-4 rounded-3 shadow-sm">
                  <div className="about-icon mb-3">🌍</div>
                  <h5>Global Reach</h5>
                  <p className="small text-muted mb-0">Serving 50+ countries</p>
                </div>
              </Col>
              <Col md={6}>
                <div className="about-card text-center p-4 rounded-3 shadow-sm">
                  <div className="about-icon mb-3">💼</div>
                  <h5>10+ Years</h5>
                  <p className="small text-muted mb-0">Industry experience</p>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default About;