import { NavLink, useLocation } from "react-router-dom";
import { Image } from "react-bootstrap";

export const SidebarLink = ({ to, icon, text }) => {
  const location = useLocation();

  const isActive =
    location.pathname === to || location.pathname.startsWith(`${to}/`);

  return (
    <NavLink
      to={to}
      end
      className={`d-flex align-items-center text-decoration-none text-start w-100 text-light p-2 side-bar-links border-right-2${
        isActive ? " active fw-semibold" : ""
      }`}
    >
      <Image
        className="me-3"
        src={icon}
        style={{ width: "24px", height: "24px" }}
      />
      <span>{text}</span>
    </NavLink>
  );
};
