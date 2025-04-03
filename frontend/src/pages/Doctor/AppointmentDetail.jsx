import React from "react";
import { useParams } from "react-router-dom";
import { Loading } from "../../components/Loading";
import { Link } from "react-router-dom";
import {
  Container,
  ListGroup,
  ListGroupItem,
  Tabs,
  Tab,
} from "react-bootstrap";
import { useAppointmentStore } from "../../store/appointmentStore";

export const AppointmentDetail = () => {
  const { id } = useParams();
  const { appointment, loading, getAppointment, error } = useAppointmentStore();

  console.log(appointment);

  useEffect(() => {
    getAppointment(id);
  }, [id]);

  if (loading) return <Loading />;

  if (error) return <Error error={error.message} />;

  return (
    <Container className="mt-5">
      <h4 className="text-center">Appointment Detail</h4>

      <p className="mb-3">
        <Link to="/doctor/appointments/" className="text-decoration-none">
          {" "}
          &#11164;&#11164; Back to Appointment
        </Link>
      </p>

      <Tabs
        defaultActiveKey="medical-history"
        id="appointment-detail"
        className="mt-5"
      >
        <Tab eventKey="detail" title="Detail">
          <ListGroup>
            <ListGroupItem>{appointment.patient_name}</ListGroupItem>
            <ListGroupItem>{appointment.appointment_date}</ListGroupItem>
            <ListGroupItem>{appointment.doctor_name}</ListGroupItem>
          </ListGroup>
        </Tab>
        <Tab eventKey="medical-history" title="Medical History">
          <table className="table my-2">
            <thead>
              <tr>
                <th>PatientName</th>
                <th>DoctorName</th>
                <th>Department</th>
                <th>Diagoniss</th>
                <th>Attended At</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Solo</td>
                <td>Jumanne</td>
                <td>Radiography</td>
                <td>Malaria</td>
                <td>10/2/2022</td>
              </tr>
            </tbody>
          </table>
        </Tab>
      </Tabs>
    </Container>
  );
};
