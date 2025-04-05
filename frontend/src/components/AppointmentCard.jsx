import React from "react";
import { ListGroup, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { colorStatus, formatDjangoDateTime, ROLE } from "../utils/functions";
import { useAuthStore } from "../store/AuthStore";
import { useAppointmentStore } from "../store/appointmentStore";

export const AppointmentCard = ({ appointment }) => {
  const {
    markAppointmentAsCompleted,
    deleteAppointment,
    completingAppointment,
  } = useAppointmentStore();

  const { user } = useAuthStore();
  const isPatient = user.role === ROLE.PATIENT;
  const isCompleted = appointment.status === "Completed";

  const handleComplete = async () => {
    await markAppointmentAsCompleted(appointment.id);
  };

  const handleCancel = async () => {
    await deleteAppointment(appointment.id);
  };

  return (
    <Card
      className="rounded-4 shadow-lg h-100 card-hover"
      style={{
        transition: "0.3s",
        backgroundColor: "#f9f9f9",
        borderBottom: isCompleted ? "8px solid #28a745" : "2px solid #fff",
      }}
    >
      <Card.Header
        className="fw-bold fs-5 text-light rounded-top-4"
        style={{ backgroundColor: "#2D4263" }}
      >
        {appointment.patient_file_number}
      </Card.Header>

      <Card.Body className="pb-0">
        <ListGroup variant="flush">
          <ListGroup.Item className="fw-semibold text-secondary">
            Patient Name:{" "}
            <span className="text-dark">{appointment.patient_name}</span>
          </ListGroup.Item>

          <ListGroup.Item className="fw-semibold text-secondary">
            Reason: <span className="text-dark">{appointment.reason}</span>
          </ListGroup.Item>

          <ListGroup.Item className="fw-semibold text-secondary">
            Date:{" "}
            <span className="text-dark">
              {formatDjangoDateTime(appointment.appointment_date)}
            </span>
          </ListGroup.Item>

          <ListGroup.Item className="fw-semibold text-secondary">
            Doctor: <span className="text-dark">{appointment.doctor_name}</span>
          </ListGroup.Item>

          <ListGroup.Item className="fw-semibold text-secondary">
            Doc-Specialization:{" "}
            <span className="text-dark">
              {appointment.doctor_specialization}
            </span>
          </ListGroup.Item>

          <ListGroup.Item className="fw-semibold text-secondary">
            Status:{" "}
            <span className={colorStatus(appointment.status)}>
              {appointment.status}
            </span>
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>

      <Card.Footer className="bg-white border-top-0 d-flex justify-content-between flex-wrap p-3 rounded-bottom-4">
        <div className="d-flex gap-2 flex-wrap">
          {!isPatient && (
            <>
              <Button
                variant="outline-primary"
                size="sm"
                className="rounded-4"
                onClick={() => setShow(true)}
                disabled={isCompleted}
              >
                Prescription
              </Button>

              <Button
                variant="outline-success"
                size="sm"
                className="rounded-4"
                onClick={handleComplete}
                disabled={isCompleted}
              >
                {completingAppointment ? "Marking..." : "Mark as Completed"}
              </Button>
            </>
          )}

          <Button
            variant="outline-danger"
            size="sm"
            className="rounded-4"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </div>

        {/* View Details Link */}
        <Link
          to={`/patient/appointments/${appointment.id}`}
          className="btn btn-outline-secondary btn-sm rounded-4"
        >
          View Details
        </Link>
      </Card.Footer>
    </Card>
  );
};
