import React from "react";
import { users } from "../utils/mock";
import { roleBadgeColor } from "../utils/functions";
import { ActionMenu } from "./ActionMenu";

export const Analytics = () => {
  return (
    <div>
      <div className="container justify-content-centter algin-items-center">
        <h5 className="text-secondary">Analytics</h5>
        <div className="row">
          <div className="col-2 p-3">
            <div className="card shadow rounded-3">
              <div className="card-body">
                <h4 className="card-title text-secondary">Online</h4>
                <p className="card-text">2.9M</p>
              </div>
            </div>
          </div>
          <div className="col-4 p-3">
            <div className="card shadow rounded-3">
              <div className="card-body">
                <h4 className="card-title text-secondary">Messages</h4>
                <p className="card-text">2.4M</p>
              </div>
            </div>
          </div>

          <div className="col-6 p-3">
            <div className="card shadow rounded-3">
              <div className="card-body">
                <h4 className="card-title text-secondary">Members</h4>
                <p className="card-text">4.4M</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Table-users */}
      <div className="container bg-light-subtle mt-5 rounded-4">
        <div className="table-responsive enhanced-table">
          <table className="table table-hover">
            <thead className="thead-dark">
              <tr>
                <th className="text-center text-secondary">Username</th>
                <th className="text-center text-secondary">Email</th>
                <th className="text-center text-secondary">Role</th>
                <th className="text-center text-secondary">Rating</th>
                <th className="text-center text-secondary">Messages</th>
                <th className="text-center text-secondary">Active</th>
                <th className="text-center text-secondary">Sign Up Date</th>
                <th className="text-center text-secondary">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>
                    <div className="d-flex align-items-center">
                      <div
                        className="me-2 bg-secondary rounded-5 p-2 text-center"
                        style={{ width: "40px", height: "40px" }}
                      >
                        {user.username.charAt(0).toUpperCase()}
                      </div>
                      {user.username}
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`badge ${roleBadgeColor(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="text-center">
                    <div className="rating-stars">
                      {"★".repeat(Math.floor(user.rating))}
                      {user.rating % 1 !== 0 && "½"}
                      <span className="text-muted ms-2">({user.rating})</span>
                    </div>
                  </td>
                  <td>
                    <div className="progress" style={{ height: "8px" }}>
                      <div
                        className="progress-bar bg-info"
                        role="progressbar"
                        style={{
                          width: `${(user.messagesSent / 50) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </td>
                  <td className="text-center">
                    {user.isActive ? "Yes" : "No"}
                  </td>
                  <td>{new Date(user.signUpDate).toLocaleDateString()}</td>
                  <td>
                    <ActionMenu />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Members */}
      <div className="container bg-light-subtle mt-5 rounded-4 p-4 bg-opacity-90">
        <div className="row">
          <div className="col-4">
            <div className="card shadow rounded-3">
              <div className="card-body">
                <h5 className="card-title text-secondary mb-2">Messages</h5>
                <p className="card-text">2.4M</p>
                <ul className="list-group">
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    A list item
                    <span className="badge text-bg-primary rounded-pill">
                      14
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    A second list item
                    <span className="badge text-bg-primary rounded-pill">
                      2
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    A third list item
                    <span className="badge text-bg-primary rounded-pill">
                      1
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    A third list item
                    <span className="badge text-bg-primary rounded-pill">
                      1
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    A third list item
                    <span className="badge text-bg-primary rounded-pill">
                      1
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    A third list item
                    <span className="badge text-bg-primary rounded-pill">
                      1
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    A third list item
                    <span className="badge text-bg-primary rounded-pill">
                      1
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    A third list item
                    <span className="badge text-bg-primary rounded-pill">
                      1
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    A third list item
                    <span className="badge text-bg-primary rounded-pill">
                      1
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    A third list item
                    <span className="badge text-bg-primary rounded-pill">
                      1
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    A third list item
                    <span className="badge text-bg-primary rounded-pill">
                      1
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    A third list item
                    <span className="badge text-bg-primary rounded-pill">
                      1
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    A third list item
                    <span className="badge text-bg-primary rounded-pill">
                      1
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    A third list item
                    <span className="badge text-bg-primary rounded-pill">
                      1
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    A third list item
                    <span className="badge text-bg-primary rounded-pill">
                      1
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    A third list item
                    <span className="badge text-bg-primary rounded-pill">
                      1
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-8">
            <div className="card shadow rounded-3">
              <div className="card-body">
                <h5 className="card-title text-secondary mb-2">Members</h5>
                <p className="card-text">4.4M</p>
                <div className="list-group">
                  <p className="list-group-item">John Doe</p>
                  <p className="list-group-item">John Doe</p>
                  <p className="list-group-item">John Doe</p>
                  <p className="list-group-item">John Doe</p>
                  <p className="list-group-item">John Doe</p>
                  <p className="list-group-item">John Doe</p>
                  <p className="list-group-item">John Doe</p>
                  <p className="list-group-item">John Doe</p>
                  <p className="list-group-item">John Doe</p>
                  <p className="list-group-item">John Doe</p>
                  <p className="list-group-item">John Doe</p>
                  <p className="list-group-item">John Doe</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
