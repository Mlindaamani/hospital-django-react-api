import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <div className="text-center">
            <h1 className="display-1">404</h1>
            <h2 className="mb-4">Page Not Found</h2>
            <p className="lead">The page you are looking for does not exist.</p>
            <p>
              You can try going back to the <Link to="/">home page</Link> or
              searching for what you're looking for.
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
