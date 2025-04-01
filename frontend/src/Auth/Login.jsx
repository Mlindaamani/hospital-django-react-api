import { useState } from "react";
import { login } from "../services/api/auth";
import { useNavigate } from "react-router-dom";
import { storeTokens } from "../utils/functions";
import { Error } from "../components/Error";
import { jwtDecode } from "jwt-decode";
import { Row, Col, Container } from "react-bootstrap";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleUserAuthentication = async (event) => {
    event.preventDefault();

    if (email === "" || password === "") {
      setError("email and password cannot be empty.");
      return;
    }
    setSubmitting(true);

    try {
      const { access, refresh } = await login({ email, password });

      storeTokens(access, refresh);

      const { role } = jwtDecode(access);

      switch (role) {
        case "doctor":
          navigate("/doctor/", { replace: true });
          break;
        case "admin":
          window.location.href = "http://localhost:8000/admin/";
          break;
        case "receptionist":
          navigate("/receptionist/", { replace: true });
          break;
        case "nurse":
          navigate("/receptionist/", { replace: true });
          break;
        case "lab_tech":
          navigate("/labtech/", { replace: true });
          break;
        case "pharmacist":
          navigate("/pharmacist/", { replace: true });
          break;
        default:
          navigate("/login/", { replace: true });
          break;
      }
    } catch (error) {
      setError("Invalid email or password.");
    } finally {
      setSubmitting(false);
    }
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
          {error && <Error error={error} />}
          <form
            onSubmit={handleUserAuthentication}
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
                disabled={submitting}
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
                disabled={submitting}
              />
            </div>
            <button
              type="submit"
              className="btn w-100 text-center btn-success fw-bold rounded-4"
              disabled={submitting}
            >
              {submitting ? "Logging in..." : "Login"}
            </button>
          </form>
        </Col>
      </Row>
    </Container>
  );
};
