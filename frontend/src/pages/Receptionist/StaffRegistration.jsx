import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Error } from "../../components/Error";

export const createNewStaff = async (form) => {
  console.log(form);
};

export const StaffRegistration = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    username: "",
    password: "",
    email: "",
    first_name: "",
    last_name: "",
    role: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleRegistration = async (event) => {
    event.preventDefault();
    if (
      form.username === "" ||
      form.last_name === "" ||
      form.first_name === "" ||
      form.email === "" ||
      form.password === "" ||
      form.role === ""
    ) {
      setError("Make sure you fill all the required fields");
    }
    setSubmitting(true);

    try {
      await createNewStaff(form);
      navigate("/receptionist/", { replace: true });
    } catch (error) {
      console.error(error);
      setError("Error has occured while registering a new user");
    } finally {
      setSubmitting(false);
    }
  };

  if (error) return <Error error={error} />;

  return (
    <Container className="d-flex justify-content-center align-items-center flex-column vh-100">
      <form className="w-75 mb-5" onSubmit={handleRegistration}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label fw-bold fs-5">
            Username
          </label>
          <input
            type="text"
            name="username"
            placeholder="Enter your username..."
            id="username"
            className="form-control p-3"
            value={form.username}
            onChange={handleChange}
            disabled={submitting}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label fw-bold fs-5">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password..."
            id="password"
            name="password"
            className="form-control p-3"
            value={form.password}
            onChange={handleChange}
            disabled={submitting}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label fw-bold fs-5">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email..."
            name="email"
            id="email"
            className="form-control p-3"
            value={form.email}
            onChange={handleChange}
            disabled={submitting}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="first_name" className="form-label fw-bold fs-5">
            Firstname
          </label>
          <input
            type="text"
            name="first_name"
            placeholder="Enter your firstname...."
            id="firs_tname"
            className="form-control p-3"
            value={form.first_name}
            onChange={handleChange}
            disabled={submitting}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="last_name" className="form-label fw-bold fs-5">
            Lastname
          </label>
          <input
            type="text"
            name="last_name"
            id="last_name"
            placeholder="Enter your lastname..."
            className="form-control p-3"
            value={form.last_name}
            onChange={handleChange}
            disabled={submitting}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="role" className="form-label fw-bold fs-5">
            Select Role
          </label>
          <select
            className="form-select p-3"
            name="role"
            id="role"
            value={form.role}
            onChange={handleChange}
            disabled={submitting}
          >
            <option value="" disabled>
              Select Role
            </option>
            <option value="admin">Admin</option>
            <option value="doctor">Doctor</option>
            <option value="receptionist">Receptionist</option>
            <option value="lab_tech">LabTechnician</option>
            <option value="pharmacist">Pharmacist</option>
            <option value="nurse">Nurse</option>
          </select>
        </div>

        <button
          type="submit"
          className="btn p-2 w-100 fw-bold rounded-3 btn-secondary"
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "SAVE CHANGES"}
        </button>
      </form>
    </Container>
  );
};
