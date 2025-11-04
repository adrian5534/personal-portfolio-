import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import profilePic from '../images/profile-pic.webp';

function Bio() {
  return (
    <section id="bio">
      <Container>
        <Row className="align-items-center">
          <Col md={4} className="text-center">
            <Image src={profilePic} roundedCircle fluid />
          </Col>
          <Col md={8}>
            <h2>Bio</h2>
            <p>Hi, I'm Adrian Reynolds — a Frontend Developer with 6 years of experience building fast, accessible, and responsive interfaces with HTML5, CSS3, JavaScript, and React/Bootstrap.</p>
            <p>I turn ideas into clean UI and focus on performance, usability, and maintainable code.</p>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Bio;