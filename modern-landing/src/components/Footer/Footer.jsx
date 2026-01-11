import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: 'About Us', href: '#about' },
      { name: 'Our Team', href: '#team' },
      { name: 'Careers', href: '#careers' },
      { name: 'Press', href: '#press' }
    ],
    services: [
      { name: 'Web Development', href: '#services' },
      { name: 'Mobile Apps', href: '#services' },
      { name: 'UI/UX Design', href: '#services' },
      { name: 'Digital Marketing', href: '#services' }
    ],
    resources: [
      { name: 'Blog', href: '#blog' },
      { name: 'Documentation', href: '#docs' },
      { name: 'Support', href: '#support' },
      { name: 'API Status', href: '#status' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '#privacy' },
      { name: 'Terms of Service', href: '#terms' },
      { name: 'Cookie Policy', href: '#cookies' },
      { name: 'GDPR', href: '#gdpr' }
    ]
  };

  return (
    <footer className="footer bg-dark text-light">
      <Container>
        <Row className="py-5">
          <Col lg={4} className="mb-4">
            <div className="footer-brand mb-3">
              <span className="logo-icon me-2">🚀</span>
              <strong className="h4">Nexus</strong>
            </div>
            <p className="text-muted mb-4">
              Building exceptional digital experiences that drive growth and 
              transform businesses worldwide.
            </p>
            <div className="social-links">
              {['📘 Facebook', '🐦 Twitter', '📷 Instagram', '💼 LinkedIn'].map((social, index) => (
                <a key={index} href="#social" className="social-link me-3">
                  {social}
                </a>
              ))}
            </div>
          </Col>

          <Col lg={2} md={6} className="mb-4">
            <h6 className="mb-3">Company</h6>
            <ul className="list-unstyled">
              {footerLinks.company.map((link, index) => (
                <li key={index} className="mb-2">
                  <a href={link.href} className="footer-link text-muted">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </Col>

          <Col lg={2} md={6} className="mb-4">
            <h6 className="mb-3">Services</h6>
            <ul className="list-unstyled">
              {footerLinks.services.map((link, index) => (
                <li key={index} className="mb-2">
                  <a href={link.href} className="footer-link text-muted">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </Col>

          <Col lg={2} md={6} className="mb-4">
            <h6 className="mb-3">Resources</h6>
            <ul className="list-unstyled">
              {footerLinks.resources.map((link, index) => (
                <li key={index} className="mb-2">
                  <a href={link.href} className="footer-link text-muted">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </Col>

          <Col lg={2} md={6} className="mb-4">
            <h6 className="mb-3">Legal</h6>
            <ul className="list-unstyled">
              {footerLinks.legal.map((link, index) => (
                <li key={index} className="mb-2">
                  <a href={link.href} className="footer-link text-muted">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </Col>
        </Row>

        <hr className="my-4 border-secondary" />

        <Row className="align-items-center py-4">
          <Col md={6}>
            <p className="text-muted mb-0">
              © {currentYear} Nexus. All rights reserved.
            </p>
          </Col>
          <Col md={6} className="text-md-end">
            <div className="footer-actions">
              <a href="#privacy" className="text-muted me-3">Privacy</a>
              <a href="#terms" className="text-muted me-3">Terms</a>
              <a href="#sitemap" className="text-muted">Sitemap</a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;