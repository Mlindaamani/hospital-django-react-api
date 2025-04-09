import React, { useState } from "react";
import { Button, Form, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import chats from "../../assets/svg/chats.svg";
import { useAuthStore } from "../../store/AuthStore";

export const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, login } = useAuthStore();

  return (
    <div className="w-100">
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          login(email, password, navigate);
        }}
        className="p-2 p-md-3 rounded-5"
      >
        <div className="text-center mb-4">
          <h5 className="h3 fw-bold text-dark" style={{ color: "#2D4200" }}>
            LOGIN NOW
          </h5>
        </div>

        <Form.Group className="mb-3">
          <Form.Label className="text-dark">Email</Form.Label>
          <Form.Control
            className="p-2"
            type="email"
            placeholder="Enter email..."
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label className="text-dark">Password</Form.Label>
          <Form.Control
            className="p-2"
            type="password"
            placeholder="Enter password..."
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button
          style={{
            backgroundColor: "#2D4200",
            border: "none",
            outline: "none",
            boxShadow: "none",
          }}
          className="w-100 py-2 fw-bold mb-3"
          type="submit"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </Form>
      <Toaster position="top-center" />
    </div>
  );
};
