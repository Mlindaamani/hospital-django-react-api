import { Container, Row, Col, ListGroup, ListGroupItem } from "react-bootstrap";
import { Outlet, NavLink } from "react-router-dom";

export const DoctorLayout = () => {
  const navStyle = {
    color: "red",
    fontSize: "16px",
    fontWeight: 600,
    fontFamily: "sans-serif",
  };

  return (
    <Container className="mt-5 vh-100">
      <Row className="g-5">
        <Col md={2} className="fixed-top">
          <ListGroup className="mt-5">
            <ListGroupItem>
              <NavLink
                to="/doctor"
                style={({ isActive }) => (isActive ? navStyle : null)}
                end
                className="text-decoration-none"
              >
                Dashboard
              </NavLink>
            </ListGroupItem>
            <ListGroupItem>
              <NavLink
                to={"/doctor/appointments"}
                style={({ isActive }) => (isActive ? navStyle : null)}
                className="text-decoration-none"
              >
                Appointments
              </NavLink>
            </ListGroupItem>
            <ListGroupItem>
              <NavLink
                to={"/doctor/patients"}
                style={({ isActive }) => (isActive ? navStyle : null)}
                className="text-decoration-none"
              >
                Patients
              </NavLink>
            </ListGroupItem>
            <ListGroupItem>
              <NavLink
                to={"/doctor/prescriptions"}
                style={({ isActive }) => (isActive ? navStyle : null)}
                className="text-decoration-none"
              >
                Prescriptions
              </NavLink>
            </ListGroupItem>
            <ListGroupItem>
              <NavLink
                to={"/doctor/labtests"}
                style={({ isActive }) => (isActive ? navStyle : null)}
                className="text-decoration-none"
              >
                Labaratory Tests
              </NavLink>
            </ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={10} className="flex-grow-1">
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};
