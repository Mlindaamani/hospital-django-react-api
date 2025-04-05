import React, { useState } from "react";
import { ListGroup, Card, Button } from "react-bootstrap";
import { colorStatus, formatDjangoDateTime } from "../utils/functions";
import { PrescriptionModal } from "./ModalPrescription";
import { useAppointmentStore } from "../store/appointmentStore";

export const AppointmentCard = ({ appointment }) => {
  const [show, setShow] = useState(false);
  const {
    markAppointmentAsCompleted,
    deleteAppointment,
    completingAppointment,
  } = useAppointmentStore();

  const handleComplete = async () => {
    await markAppointmentAsCompleted(appointment.id);
  };

  const handleCancel = async () => {
    await deleteAppointment(appointment.id);
  };

  const isCompleted = appointment.status === "Completed";

  return (
    <Card
      className="rounded-4 shadow-lg border-0 h-100 card-hover"
      style={{ transition: "0.3s", backgroundColor: "#f9f9f9" }}
    >
      <PrescriptionModal
        patientId={appointment.patient}
        patientName={appointment.patient_name}
        fileNumber={appointment.patient_file_number}
        show={show}
        onHide={() => setShow(false)}
      />

      <Card.Header
        className="fw-bold fs-5  text-light rounded-top-4"
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
            Status:{" "}
            <span className={colorStatus(appointment.status)}>
              {appointment.status}
            </span>
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>

      <Card.Footer className="bg-white border-top-0 d-flex justify-content-between flex-wrap gap-2 p-3 rounded-bottom-4">
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
          {completingAppointment ? "Marking..." : "Complete"}
        </Button>

        <Button
          variant="outline-danger"
          size="sm"
          className="rounded-4"
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </Card.Footer>
    </Card>
  );
};
