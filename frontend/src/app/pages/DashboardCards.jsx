import React from "react";

export const DashboardCards = () => {
  return (
    <section class="py-5">
      <div class="container">
        <h2 class="mb-4">Dashboards</h2>
        <div class="row">
          <div class="col-lg-3">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Patient Dashboard</h5>
                <p class="card-text">
                  View patient records, appointments, and medical history.
                </p>
                <a href="#" class="btn btn-primary">
                  Login
                </a>
              </div>
            </div>
          </div>
          <div class="col-lg-3">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Doctor Dashboard</h5>
                <p class="card-text">
                  View patient records, appointments, and medical history.
                </p>
                <a href="#" class="btn btn-primary">
                  Login
                </a>
              </div>
            </div>
          </div>
          <div class="col-lg-3">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Lab Technician Dashboard</h5>
                <p class="card-text">
                  View lab test results, patient records, and medical history.
                </p>
                <a href="#" class="btn btn-primary">
                  Login
                </a>
              </div>
            </div>
          </div>
          <div class="col-lg-3">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Receptionist Dashboard</h5>
                <p class="card-text">
                  View patient records, appointments, and medical history.
                </p>
                <a href="#" class="btn btn-primary">
                  Login
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

