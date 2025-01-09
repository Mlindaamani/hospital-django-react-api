import React, { useState } from "react";
import { ListGroup, Card, Button } from "react-bootstrap";
import { colorStatus } from "../utils/functions";
import { PrescriptionModal } from "./ModalPrescription";

export const AppointmentCard = ({
  appointment,
  onAppointmentComplete,
  onCancelAppointment,
}) => {
  const [show, setShow] = useState(false);

  return (
    <Card className="rounded-3 appointment" border="info">
      <PrescriptionModal
        patientId={appointment.patient}
        patientName={appointment.patient_name}
        fileNumber={appointment.patient_file_number}
        show={show}
        onHide={() => setShow(false)}
      />
      <Card.Header className="fw-bold fs-4 bg-primary bg-opacity-50 text-light">
        {appointment.patient_file_number}
      </Card.Header>
      <Card.Body>
        <ListGroup variant="flush">
          <ListGroup.Item className="fw-bold text-secondary">
            PatientName:{" "}
            <span className="fw-bold text-info">
              {appointment.patient_name}
            </span>
          </ListGroup.Item>
          <ListGroup.Item className="text-secondary">
            Reason:{" "}
            <span className="fw-bold text-info">{appointment.reason}</span>
          </ListGroup.Item>
          <ListGroup.Item className="fw-bold text-secondary">
            Date:{" "}
            <span className="fw-bold text-info">
              {appointment.appointment_date}
              {appointment.appointment_date}
            </span>
          </ListGroup.Item>

          <ListGroup.Item className="fw-bold text-secondary">
            Status:{" "}
            <span className={colorStatus(appointment.status)}>
              {appointment.status}
            </span>
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
      <Card.Footer className="border-top-0 mx-3 mb-2  bg-white">
        <Button
          variant="outline-primary rounded-4 m-1"
          size="sm"
          onClick={() => setShow(true)}
          disabled={appointment.status === "Completed"}
        >
          Prescription
        </Button>

        <Button
          disabled={appointment.status === "Completed"}
          variant="outline-success rounded-4 m-1 text-center"
          onClick={() => onAppointmentComplete(appointment.id)}
          size="sm"
        >
          Completed
        </Button>

        <Button
          variant="outline-danger rounded-4 m-1 text-center"
          size="sm"
          onClick={() => onCancelAppointment(appointment.id)}
        >
          Cancel
        </Button>
      </Card.Footer>
    </Card>
  );
};