import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDoctorStore } from "../../store/doctorStore";
import { useAppointmentStore } from "../../store/appointmentStore";
import { Toaster } from "react-hot-toast";
useDoctorStore;
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Card,
} from "react-bootstrap";

export const AppointmentForm = () => {
  const { doctors, getDoctors } = useDoctorStore();
  const { createAppointment } = useAppointmentStore();

  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState(null);
  const [reason, setReason] = useState("");

  useEffect(() => {
    getDoctors();
  }, [getDoctors]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    createAppointment({
      doctor: selectedDoctor?.id,
      appointment_date: appointmentDate,
      reason: reason,
    });

    setSelectedDoctor(null);
    setAppointmentDate(null);
    setReason("");
  };

  const handleDoctorClick = (doctor) => {
    setSelectedDoctor(doctor);
  };

  return (
    <Container className="mt-5">
      <h4 className="text-primary mb-5">Book an Appointment</h4>
      <h5 className="mb-3">Choose a Doctor</h5>
      <Row className="mb-4 g-3">
        {doctors.map((doctor) => {
          const isSelected = selectedDoctor?.id === doctor.id;
          return (
            <Col md={4} key={doctor.id}>
              <Card
                onClick={() => handleDoctorClick(doctor)}
                className={`p-4 rounded-4 h-100 cursor-pointer shadow-sm ${
                  isSelected ? "border-primary shadow-lg" : "border-info"
                }`}
                style={{
                  borderWidth: isSelected ? "3px" : "2px",
                  cursor: "pointer",
                  transition: "all 0.2s ease-in-out",
                }}
              >
                <h6 className="text-primary">
                  Dr. {doctor.first_name} {doctor.last_name}
                </h6>
                <p className="text-muted mb-0">{doctor.specialization}</p>
              </Card>
            </Col>
          );
        })}
      </Row>

      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="appointmentDate" className="mb-4 mt-3">
              <Form.Label>Appointment Date & Time</Form.Label>
              <DatePicker
                selected={appointmentDate}
                onChange={(date) => setAppointmentDate(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={30}
                dateFormat="yyyy-MM-dd HH:mm"
                placeholderText="Select date and time"
                className="form-control bg-light shadow-sm"
                required
                timeCaption="Time"
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="reason" className="mb-4">
          <Form.Label>Reason</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Describe your symptoms or concern..."
            required
          />
        </Form.Group>

        <Button type="submit" variant="primary">
          Book Appointment
        </Button>
      </Form>
      <Toaster />
    </Container>
  );
};
