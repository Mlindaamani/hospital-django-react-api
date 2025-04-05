import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Image, Button } from "react-bootstrap";
import { useAuthStore } from "../stores/authStore";
import avatar from "../assets/svg/avatar.svg";
import toggler from "../assets/svg/toggler.svg";
import logoutGray from "../assets/svg/logout.svg";

export const DashboardHeader = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuthStore();
  const location = useLocation();
  const isPatient = user.role === "patient";

  return (
    <header className="bg-light-subtle border-bottom d-flex justify-content-between align-items-center p-3">
      <div className="d-flex align-items-center">
        <img src={toggler} alt="Toggle Sidebar" className="me-3" />
        <small className="mb-0 text-secondary text-capitalize">
          {location.pathname.slice(1)}
        </small>
      </div>

      <div className="d-flex align-items-center gap-3">
        {/* Username */}
        <span style={{ color: "#2D4200", fontWeight: 600 }}>
          {user?.username}
        </span>

        {/* Avatar */}
        <Image
          src={user?.photo ? user.photo : avatar}
          roundedCircle
          fluid
          width={45}
          height={45}
          className="me-1"
        />

        {/* Logout Button */}
        <Button
          onClick={() => logout(navigate)}
          className={`d-flex align-items-center gap-2 btn-sm ${
            isPatient ? "border-0" : ""
          }`}
          style={{
            backgroundColor: isPatient ? "#2D4200" : "#6c757d",
            color: "#fff",
            fontWeight: 500,
            padding: "0.375rem 0.75rem",
            borderRadius: "8px",
          }}
        >
          <Image src={logoutGray} alt="Logout" height={16} />
          Logout
        </Button>
      </div>
    </header>
  );
};
