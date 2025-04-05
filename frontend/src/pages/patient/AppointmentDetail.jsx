import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Card,
  ListGroup,
  Spinner,
  Breadcrumb,
  Container,
} from "react-bootstrap";
import { useAppointmentStore } from "../../store/appointmentStore";
import { formatDjangoDateTime } from "../../utils/functions";

export const AppointmentDetail = () => {
  const { id } = useParams();
  console.log(id);
  const { getAppointment, loading, appointment } = useAppointmentStore();

  console.log(appointment);

  useEffect(() => {
    getAppointment(id);
  }, [id, getAppointment]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" variant="success" />
      </div>
    );
  }

  return (
    <Container className="mt-4">
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/patient" }}>
          Dashboard
        </Breadcrumb.Item>
        <Breadcrumb.Item
          linkAs={Link}
          linkProps={{ to: "/patient/appointments" }}
        >
          Appointments
        </Breadcrumb.Item>
        <Breadcrumb.Item active />
      </Breadcrumb>

      <Card className="shadow-sm">
        <Card.Header className="bg-success text-white">
          Appointment Details
        </Card.Header>
        <Card.Body>
          <Card.Title>Dr. {appointment?.doctor_name || "N/A"}</Card.Title>
          <Card.Text>
            <strong>Status:</strong> {appointment?.status || "Pending"}
          </Card.Text>
        </Card.Body>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <strong>Date:</strong>{" "}
            {formatDjangoDateTime(appointment?.appointment_date)}
          </ListGroup.Item>

          <ListGroup.Item>
            <strong>Patient:</strong> {appointment?.patient_name || "You"}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Reason:</strong> {appointment?.reason || "Not specified"}
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </Container>
  );
};
