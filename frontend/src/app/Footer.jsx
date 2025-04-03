import React from "react";

export const Footer = () => {
  return (
    <footer className="bg-light text-center text-lg-start">
      <div className="container p-4">
        <div className="row">
          <div className="col-lg-6 col-md-12">
            <h5 className="text-uppercase">Hospital Management System</h5>
            <p>Providing quality healthcare management solutions.</p>
          </div>
          <div className="col-lg-6 col-md-12">
            <h5 className="text-uppercase">Contact Us</h5>
            <p>Email: support@hospitalmanagement.com</p>
            <p>Phone: +1 234 567 890</p>
          </div>
        </div>
      </div>
      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}
      >
        &copy; 2023 Hospital Management System
      </div>
    </footer>
  );
};

