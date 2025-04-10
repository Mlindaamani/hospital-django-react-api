import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
    <div className="container-fluid d-flex flex-column min-vh-100">
      <Toaster position="top-center" />
      <div className="row justify-content-center align-items-center flex-grow-1">
        <div className="col-12 col-md-8 col-lg-5 col-xl-3">
          <div className="card shadow-lg p-3 p-md-4">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
