import React from "react";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="chat-app text-white py-5">
      <div className="container">
        <div className="row g-4">
          {/* Brand Info */}
          <div className="col-md-4 text-center text-md-start">
            <h3 className="text-light mb-3">eChat</h3>
            <p className="text-light opacity-75">
              Connecting people through seamless communication.
            </p>
          </div>

          {/* Useful Links */}
          <div className="col-md-4 text-center">
            <h5 className="text-light mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link
                  href="#feature"
                  className="text-light text-decoration-none hover-opacity"
                >
                  Features
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  href="#pricing"
                  className="text-light text-decoration-none hover-opacity"
                >
                  Pricing
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  href="#"
                  className="text-light text-decoration-none hover-opacity"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-light text-decoration-none hover-opacity"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="col-md-4 text-center text-md-end">
            <h5 className="text-light mb-3">Follow Us</h5>
            <div className="d-flex justify-content-center justify-content-md-end gap-3">
              <Link
                to="#"
                className="btn btn-link text-light p-2 hover-scale"
                aria-label="Twitter"
              ></Link>
              <Link
                to="#"
                className="btn btn-link text-light p-2 hover-scale"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook-f fa-lg"></i>
              </Link>
              <Link
                to="#"
                className="btn btn-link text-light p-2 hover-scale"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram fa-lg"></i>
              </Link>

              <Link
                to="#"
                className="btn btn-link text-light p-2 hover-scale"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin-in fa-lg"></i>
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="row mt-5">
          <div className="col-12 text-center">
            <p className="text-light opacity-75 mb-0 border-top pt-4">
              &copy; 2025 eChat. All rights reserved. |
              <Link
                to="#"
                className="text-light text-decoration-none ms-2 hover-opacity"
              >
                Privacy Policy
              </Link>{" "}
              |
              <Link
                to="#"
                className="text-light text-decoration-none ms-2 hover-opacity"
              >
                Terms of Service
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
