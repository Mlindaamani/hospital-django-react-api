import { Alert, Container } from "react-bootstrap";
export const Error = ({ error }) => {
  return (
    <Container className="mt-5">
      <Alert variant="danger">{error}</Alert>
    </Container>
  );
};
