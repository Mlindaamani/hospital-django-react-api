import React from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Container className="mt-5 d-flex justify-content-center align-items-center flex-column">
      <span className="fw-bold fs-1 mt-5"> 404-Not Found</span>
      <button onClick={() => navigate(-1)} className="btn btn-primary p-3 mt-3">
        Go Back{" "}
      </button>
    </Container>
  );
};
