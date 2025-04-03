import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { Row, Col, Container } from "react-bootstrap";
import { useAuthStore } from "../store/AuthStore";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password, navigate);
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row className="w-75 p-5">
        <Col
          md={4}
          className="d-none d-md-block border border-3 p-2 bg-primary rounded-start-4"
        >
          <h4 className="fw-bold mt-3 text-white text-center">Welcome Back!</h4>
          <div className="mt-3">
            <img src="" alt="" />
          </div>
        </Col>

        <Col
          md={8}
          className="d-flex flex-column justify-content-center border border-2 p-2 bg-primary rounded-end-4"
        >
          <h4 className="text-center mt-3 mb-4 text-white">
            LOGIN TO EBOTCARE
          </h4>
          <form
            onSubmit={handleSubmit}
            className="p-3 text-light w-90"
            autoComplete="off"
          >
            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-bold">
                Email
              </label>
              <input
                type="text"
                id="email"
                className="form-control fw-bold"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                disabled={loading}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label fw-bold">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form-control fw-bold"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              className="btn w-100 text-center btn-success fw-bold rounded-4"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </Col>
        <Toaster />
      </Row>
    </Container>
  );
};
