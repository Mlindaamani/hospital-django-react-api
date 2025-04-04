import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/AuthStore";

export const AuthRequired = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuthStore();

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
