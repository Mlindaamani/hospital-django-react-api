import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../utils/functions";

export const AuthRequired = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to={"/login"} replace />;
};
