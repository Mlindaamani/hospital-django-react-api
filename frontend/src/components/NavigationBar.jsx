import { Nav, Container, Navbar } from "react-bootstrap";
import { useAuthStore } from "../store/AuthStore";
import { useNavigate } from "react-router-dom";

export const NavigationBar = ({ user }) => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  return (
    <Navbar bg="primary" className="fixed-top p-2">
      <Container>
        <Navbar.Brand className="text-light p-3">EBOT-CARE</Navbar.Brand>
        <Navbar.Toggle />

        <Navbar.Collapse className="d-flex justify-content-end gap-5">
          <Nav.Link className="fw-bold disabled fs-5 p-3 text-light">
            {user?.first_name} {user?.last_name}
          </Nav.Link>

          <Nav.Link onClick={() => logout(navigate)} className="text-light p-2">
            Logout
          </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
