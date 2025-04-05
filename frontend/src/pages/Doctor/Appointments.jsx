import React, { useEffect, useState } from "react";
import { AppointmentCard } from "../../components/AppointmentCard";
import { filterAppointmentByCustomFields } from "../../utils/functions";
import { Container, Row, Col, Image } from "react-bootstrap";
import { SearchComponent } from "./SearchComponent";
import { Link } from "react-router-dom";
import { Loading } from "../../components/Loading";
import { useAppointmentStore } from "../../store/appointmentStore";
import event from "../../assets/svg/event.svg";

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
      <Container className="d-flex justify-content-center align-items-center flex-column h-100 mt-5">
        <div className="text-center">
          <Image
            src={event}
            fluid
            className="mb-3 rounded-2"
            style={{ maxWidth: "80px" }}
          />
          <h4 className="mb-3">No Appointments Scheduled</h4>
          <p className="mb-4 text-secondary">
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
    <Container className="mt-4">
      <SearchComponent
        handleOnChange={(e) => setQuery(e.target.value)}
        searchTerm={query}
        placeholder={"Search Appointments..."}
      />

      <Row className="g-5 mt-2">
        {filteredAppointments.map((appointment) => (
          <Col key={appointment.id} xs={12} md={6} lg={4} className="mb-3">
            <AppointmentCard appointment={appointment} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};
