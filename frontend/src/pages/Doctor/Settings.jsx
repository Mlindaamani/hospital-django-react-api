import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Alert,
} from "react-bootstrap";

export const DoctorSettings = () => {
  const [formData, setFormData] = useState({
    name: "Dr. Strange",
    email: "strange@hospital.com",
    specialty: "Neurology",
    available: true,
    password: "",
    confirmPassword: "",
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <Container className="mt-2" fluid>
      <Row className="justify-content-center">
        <Col md={10}>
          <Card className="p-4 shadow-lg rounded-4 border-0">
            <h4
              className="mb-5"
              style={{
                color: "#2D4263",
              }}
            >
              ⚙️ Doctor Settings
            </h4>

            {success && (
              <Alert variant="success">Settings updated successfully!</Alert>
            )}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-5" controlId="name">
                <Form.Label className="fw-semibold text-secondary">
                  Full Name
                </Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                />
              </Form.Group>

              <Form.Group className="mb-5" controlId="email">
                <Form.Label className="fw-semibold text-secondary">
                  Email
                </Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                />
              </Form.Group>

              <Form.Group className="mb-5" controlId="specialty">
                <Form.Label className="fw-semibold text-secondary">
                  Specialty
                </Form.Label>
                <Form.Control
                  type="text"
                  name="specialty"
                  value={formData.specialty}
                  onChange={handleChange}
                  placeholder="e.g. Pediatrics, Orthopedics"
                />
              </Form.Group>

              <Form.Group className="mb-5" controlId="availability">
                <Form.Check
                  type="switch"
                  name="available"
                  checked={formData.available}
                  onChange={handleChange}
                  label="Available for appointments"
                  className="fw-semibold"
                />
              </Form.Group>

              <hr />

              <h6 className="text-secondary fw-bold mt-4 mb-5">
                Change Password
              </h6>

              <Form.Group className="mb-5" controlId="password">
                <Form.Label className="text-secondary">New Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter new password"
                />
              </Form.Group>

              <Form.Group className="mb-5" controlId="confirmPassword">
                <Form.Label className="text-secondary">
                  Confirm Password
                </Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm new password"
                />
              </Form.Group>

              <Button
                style={{
                  backgroundColor: "#2D4263",
                  outline: "none",
                }}
                type="submit"
                className="rounded-4 px-4"
              >
                Save Changes
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
