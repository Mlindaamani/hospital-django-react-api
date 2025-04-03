import React, { useEffect, useState } from "react";
import { AppointmentCard } from "../../components/AppointmentCard";
import { filterAppointmentByCustomFields } from "../../utils/functions";
import { Container, Row, Col } from "react-bootstrap";
import { SearchComponent } from "./SearchComponent";
import { Link } from "react-router-dom";
import { Loading } from "../../components/Loading";
import { useAppointmentStore } from "../../store/appointmentStore";

export const Appointments = () => {
  const { appointments, loading, getAppointments } = useAppointmentStore();

  const [query, setQuery] = useState("");

  useEffect(() => {
    getAppointments();
  }, [getAppointments]);

  const filteredAppointments = filterAppointmentByCustomFields(
    appointments,
    query
  );

  if (loading) return <Loading />;

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
        handleOnChange={(e) => setQuery(e.target.value)}
        searchTerm={query}
        placeholder={"Search Appointments..."}
      />

      <Row xs={1} md={2} className="g-5">
        {filteredAppointments.map((appointment) => (
          <Col key={appointment.id}>
            <AppointmentCard appointment={appointment} key={appointment.id} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};
