import { Link, Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
    <div className="container-fluid d-flex flex-column min-vh-100">
      <div className="row justify-content-center align-items-center flex-grow-1">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          <div className="d-flex justify-content-center gap-3 mb-4">
            <Link
              to="/login"
              className="link-secondary text-decoration-none fs-5"
            >
              Login
            </Link>
            <span className="text-muted">|</span>
            <Link to="#" className="link-secondary text-decoration-none fs-5">
              Register
            </Link>
          </div>

          <div className="card shadow-lg p-3 p-md-4">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
