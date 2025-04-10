import React from "react";
import { ListGroup, Card, Button, Row, Col } from "react-bootstrap";
import { colorStatus, formatDjangoDateTime } from "../../utils/functions";
import { useAppointmentStore } from "../../store/appointmentStore";
import toast from "react-hot-toast";
export const PatientAppointmentCard = ({ appointment }) => {
  const { deleteAppointment } = useAppointmentStore();
  const isCompleted = appointment.status === "Completed";

  const handleCancel = async () => {
    await deleteAppointment(appointment.id);
  };

  const handleUpdate = () => {
    toast(
      (t) => (
        <div className="p-3">
          <Row className="mb-3">
            <Col>
              <p>Are you sure you want to delete this appointment?</p>
            </Col>
          </Row>
          <Row className="g-2">
            <Col>
              <Button
                variant="danger"
                size="sm"
                className="w-100"
                onClick={() => {
                  deleteAppointment(appointment.id);
                  toast.dismiss(t.id);
                }}
              >
                Confirm
              </Button>
            </Col>
            <Col>
              <Button
                variant="outline-secondary"
                size="sm"
                className="w-100"
                onClick={() => toast.dismiss(t.id)}
              >
                Cancel
              </Button>
            </Col>
          </Row>
        </div>
      ),
      {
        id: "delete-appointment",
        position: "top-center",
        duration: Infinity,
        style: {
          background: "#f8d7da",
          color: "#721c24",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          maxWidth: "400px",
          width: "100%",
        },
      }
    );
  };

  return (
    <Card
      className="rounded-4 shadow-lg h-100 card-hover"
      style={{
        transition: "0.1s",
        backgroundColor: "#fff",
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
          <Button
            variant="outline-primary"
            size="sm"
            className="rounded-4"
            onClick={handleUpdate}
          >
            Edit
          </Button>

          <Button
            variant="outline-danger"
            size="sm"
            className="rounded-4"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </div>
      </Card.Footer>
    </Card>
  );
};
