import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Image, Button } from "react-bootstrap";
import { useAuthStore } from "../store/AuthStore";
import avatar from "../assets/svg/avatar.svg";
import toggler from "../assets/svg/toggler.svg";
import logoutGray from "../assets/svg/logout.svg";
import { dashboardTitle } from "../utils/functions";

export const DashboardHeader = () => {
  const navigate = useNavigate();
  const { logout, profile, userProfile } = useAuthStore();
  const { user } = useAuthStore();

  useEffect(() => {
    userProfile();
  }, [userProfile]);


  return (
    <header className="bg-light-subtle border-bottom d-flex justify-content-between align-items-center p-3">
      <div className="d-flex align-items-center">
        <img src={toggler} alt="Toggle Sidebar" className="me-3" />
        <small className="mb-0 fw-semibold" style={{ color: "#2D4200" }}>
          {dashboardTitle(user)}
        </small>
      </div>
      <div className="d-flex align-items-center gap-2">
        {/* Username */}
        <span className="fw-bold" style={{ color: "#2D4200" }}>
          {user?.first_name} {user?.last_name}
        </span>
        <Image
          src={profile.patient_profile_url}
          roundedCircle
          fluid
          width={50}
          height={50}
          className="me-2"
        />
        <Button
          onClick={() => logout(navigate)}
          style={{ backgroundColor: "#2D4200", border: "none" }}
          className="d-flex justify-content-between align-items-center gap-2 btn-sm"
        >
          <Image src={logoutGray} />
          Logout
        </Button>
      </div>
    </header>
  );
};
