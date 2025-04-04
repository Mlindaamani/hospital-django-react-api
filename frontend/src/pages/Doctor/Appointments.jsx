import React, { useEffect, useState } from "react";
import { AppointmentCard } from "../../components/AppointmentCard";
import { filterAppointmentByCustomFields } from "../../utils/functions";
import { Container, Row, Col } from "react-bootstrap";
import { SearchComponent } from "./SearchComponent";
import { Link } from "react-router-dom";
import { Loading } from "../../components/Loading";
import { useAppointmentStore } from "../../store/appointmentStore";
import event from "../../assets/svg/event.svg";
import { Image } from "react-bootstrap";

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
      <Container className="d-flex justify-content-center align-items-center flex-column h-100">
        <div className="text-center">
          <Image
            src={event}
            fluid
            className="mb-3 rounded-2"
            style={{ maxWidth: "80px" }}
          />
          <h4 className="mb-5">No Appointments Scheduled</h4>
          <p className="mb-5 text-secondary">
            You don't have any appointments scheduled yet.
          </p>
          <Link
            to="/doctor"
            className="btn text-light"
            style={{ backgroundColor: "#2D4263" }}
          >
            View Analytics
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <Container className="mt-2">
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
