import React from 'react';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';

function Resume() {
  return (
    <section id="resume">
      <Container>
        <h2>Resume</h2>
        <Row>
          <Col md={6}>
            <h3>Work Experience</h3>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h5>Freelance Web Developer</h5>
                <p>Self-employed - 2019 - Present (6 yrs)</p>
                <ul>
                  <li>Build responsive React/Bootstrap UIs.</li>
                  <li>Ship accessible, performant HTML/CSS.</li>
                </ul>
              </ListGroup.Item>
              <ListGroup.Item>
                <h5>Frontend Developer</h5>
                <p>YSB Academy LLC - Jun 2024 - Present</p>
                <ul>
                  <li>Features and polish for a production React app.</li>
                  <li>Improved load times and UX.</li>
                </ul>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={6}>
            <h3>Education</h3>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h5>High School Diploma</h5>
                <p>Norman Manley High School - 2014</p>
              </ListGroup.Item>
            </ListGroup>
            <h3>Skills</h3>
            <ListGroup variant="flush">
              <ListGroup.Item>Frontend: HTML5, CSS3, JavaScript (ES6+), TypeScript, React, Vue, Angular, Bootstrap, jQuery</ListGroup.Item>
              <ListGroup.Item>Backend & Tools: Node.js, Python, REST/GraphQL APIs, performance, Git/GitHub, VS Code</ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Resume;