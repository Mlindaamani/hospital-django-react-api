import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useAppointmentStore } from "../../store/appointmentStore";
import { useDoctorStore } from "../../store/doctorStore";
import { usePatientsStore } from "../../store/patientsStore";

export const NewAppointment = () => {
  const { doctors } = useDoctorStore();
  const { createAppointment } = useAppointmentStore();
  const { patients } = usePatientsStore();

  const [appointmentData, setAppointmentData] = useState({
    patient: "",
    doctor: "",
    appointment_date: "",
    reason: "",
  });

  const handleAppointmentChange = (event) => {
    const { name, value } = event.target;
    setAppointmentData({ ...appointmentData, [name]: value });
  };

  const handleAppointmentSubmit = (event) => {
    event.preventDefault();
    createAppointment(appointmentData);
  };

  return (
    <Container className="mt-5 vh-100">
      <Form onSubmit={handleAppointmentSubmit} className="w-75">
        <h5 className="mb-5 text-center fw-bold text-secondary fs-4">
          + Create New Appointment
        </h5>
        <Form.Group className="mb-5 mt-3">
          <Form.Label htmlFor="patient" className="fw-bold text-secondary fs-5">
            Select a patient
          </Form.Label>
          <Form.Select
            name="patient"
            size="lg"
            onChange={handleAppointmentChange}
            value={appointmentData.patient}
            id="patient"
          >
            <option value="" disabled></option>
            {patients.map((patient) => (
              <option value={patient.id} key={patient.id}>
                {patient.first_name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-5 mt-3">
          <Form.Label className="fw-bold text-secondary fs-5">
            Select a doctor
          </Form.Label>
          <Form.Select
            name="doctor"
            size="lg"
            onChange={handleAppointmentChange}
            value={appointmentData.doctor}
          >
            <option value="" disabled></option>
            {doctors.map((doctor) => (
              <option value={doctor.id} key={doctor.id}>
                {doctor.first_name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-5">
          <Form.Label className="fw-bold text-secondary fs-5">
            Appointment Date
          </Form.Label>
          <Form.Control
            type="datetime-local"
            className="p-2 bg-"
            value={appointmentData.appointment_date}
            name="appointment_date"
            onChange={handleAppointmentChange}
          />
        </Form.Group>

        <Form.Group className="mb-5 mt-3">
          <Form.Label className="fw-bold text-secondary fs-5">
            Reason for the Appointment
          </Form.Label>
          <Form.Control
            as="textarea"
            cols={5}
            rows={5}
            onChange={handleAppointmentChange}
            name="reason"
            placeholder="Please write the reason for the Appointment..."
          />
        </Form.Group>

        <Form.Group className="mb-5 mt-3 text-center">
          <Button type="submit" variant="secondary fs-5 w-100 fw-bold">
            Create Appointment
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};
