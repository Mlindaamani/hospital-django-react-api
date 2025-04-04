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
      className={`text-decoration-none text-start w-100 text-light mb-1 p-2  side-bar-links ${
        isActive ? "active" : ""
      }`}
    >
      <Image className="me-2" src={icon} />
      {text}
    </NavLink>
  );
};
