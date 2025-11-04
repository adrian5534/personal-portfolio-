import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { FaExternalLinkAlt } from 'react-icons/fa';
import '../styles/projects.css';
import { projects } from '../data/projects';

function Preview({ url, title }) {
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      if (loading) {
        setLoading(false);
        setFailed(true);
      }
    }, 3500);
    return () => clearTimeout(t);
  }, [loading]);

  return (
    <div className="preview-wrap">
      {loading && <div className="preview-skeleton" aria-hidden="true" />}
      {!failed && (
        <iframe
          className="preview-frame"
          title={`${title} preview`}
          src={url}
          loading="lazy"
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
          onLoad={() => {
            setLoading(false);
            setFailed(false);
          }}
        />
      )}
      {failed && (
        <div className="preview-fallback">
          <p>Live preview unavailable here.</p>
          <Button
            size="sm"
            variant="light"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open live demo <FaExternalLinkAlt className="ms-1" />
          </Button>
        </div>
      )}
    </div>
  );
}

function Projects() {
  return (
    <section id="projects">
      <Container>
        <h2 className="mb-4">Projects</h2>
        <Row>
          {projects.map((p, idx) => (
            <Col md={6} lg={6} key={idx} className="mb-4">
              <Card className="project-card h-100">
                <Preview url={p.url} title={p.title} />
                <Card.Body>
                  <Card.Title className="mb-2">{p.title}</Card.Title>
                  <Card.Text className="project-summary">{p.summary}</Card.Text>

                  <ul className="project-highlights">
                    {p.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>

                  <div className="project-tech">
                    {p.tech.map((t) => (
                      <Badge bg="secondary" key={t} className="me-1 mb-1 tech-chip">
                        {t}
                      </Badge>
                    ))}
                  </div>

                  <div className="d-flex gap-2 mt-3">
                    <Button
                      variant="primary"
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Live demo <FaExternalLinkAlt className="ms-1" />
                    </Button>
                    <Button variant="outline-primary" href="#contact">
                      Work with me
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default Projects;