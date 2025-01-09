import { Container, Row, Col } from "react-bootstrap";
import { Outlet } from "react-router-dom";

export const ReceptionistLayout = () => {
  return (
    <Container fluid>
      <Row className="g-5">
        <Col md={2}></Col>
        <Col md={8}>
          <Outlet />
        </Col>
        <Col md={2}></Col>
      </Row>
    </Container>
  );
};
