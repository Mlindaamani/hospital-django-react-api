import { Spinner, Container } from "react-bootstrap";

export const Loading = () => {
  return (
    <Container className="d-flex justify-content-center mt-5 align-items-center vh-100">
      <Spinner animation="border" variant="success" />
    </Container>
  );
};
