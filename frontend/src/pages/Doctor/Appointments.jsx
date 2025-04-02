import React, { useEffect, useState } from "react";
import { Error } from "../../components/Error";
import { AppointmentCard } from "../../components/AppointmentCard";
import { filterAppointmentByCustomFields } from "../../utils/functions";
import { Container, Row, Col } from "react-bootstrap";
import { SearchComponent } from "./SearchComponent";
import { Link } from "react-router-dom";
import { Loading } from "../../components/Loading";
import { axiosInstance } from "../../config/config";

export const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [appointmentQuery, setAppointmentQuery] = useState("");
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/appointments/");
        setAppointments(response.data);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch appointments. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  useEffect(() => {
    setFilteredAppointments(
      filterAppointmentByCustomFields(appointments, appointmentQuery)
    );
  }, [appointmentQuery, appointments]);

  if (loading) return <Loading />;

  if (error) <Error error={error.response.data.detail} />;

  const handleAppointmentComplete = async (appointmentId) => {
    try {
      await axiosInstance.patch(`/appointments/${appointmentId}/`, {
        status: "Completed",
      });

      //😊Update the local state for the appointment that have changed.
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment.id === appointmentId
            ? { ...appointment, status: "Completed" }
            : appointment
        )
      );
    } catch (error) {
      console.error(error);
      setError("Failed to update appointment status.");
    }
  };

  const handleCancelAppointment = async (appointmentId) => {
    try {
      await axiosInstance.delete(`/appointments/${appointmentId}/`, {
        pk: appointmentId,
      });

      //💚 Update the local state to refresh
      setAppointments((prevAppointments) =>
        prevAppointments.filter(
          (appointment) => appointment.id !== appointmentId
        )
      );
    } catch (error) {
      console.error(error);
      setError("Failed to cancel appointment.");
    }
  };

  if (appointments.length === 0) {
    return (
      <Container className="d-flex justify-content-center align-items-center flex-column">
        <h4 className="mb-5"> 😴 No Appointment yet</h4>
        <h5>
          <Link to="/doctor/" className="text-decoration-none">
            View Analytics
          </Link>
        </h5>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <SearchComponent
        handleOnChange={(e) => setAppointmentQuery(e.target.value)}
        searchTerm={appointmentQuery}
        placeholder={"Search Appointments..."}
      />

      <Row xs={1} md={2} className="g-5">
        {filteredAppointments.map((appointment) => (
          <Link
            key={appointment.id}
            to={`/doctor/appointments/${appointment.id}`}
            className="text-decoration-none"
          >
            <Col key={appointment.id}>
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
                onAppointmentComplete={handleAppointmentComplete}
                onCancelAppointment={handleCancelAppointment}
              />
            </Col>
          </Link>
        ))}
      </Row>
    </Container>
  );
};
