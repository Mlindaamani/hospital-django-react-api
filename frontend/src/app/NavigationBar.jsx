import React from "react";
import { Link } from "react-router-dom";

export const NavigationBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          Hospital Management System
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link active" aria-current="page">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/patient-dashboard" className="nav-link">
                Patient Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/doctor-dashboard" className="nav-link">
                Doctor Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/lab-technician-dashboard" className="nav-link">
                Lab Technician Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/receptionist-dashboard" className="nav-link">
                Receptionist Dashboard
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

