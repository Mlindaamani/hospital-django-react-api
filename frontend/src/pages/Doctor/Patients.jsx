import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import { Error } from "../../components/Error";
import { SearchComponent } from "./SearchComponent";
import { Loading } from "../../components/Loading";
import { usePatientsStore } from "../../store/patientsStore";
import { filterPatients } from "../../utils/functions";

export const Patients = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { patients, loading, error, getPatients } = usePatientsStore();

  useEffect(() => {
    getPatients();
  }, [getPatients]);

  const filteredPatients = filterPatients(patients, searchTerm);

  if (error) return <Error error={error} />;

  if (loading) return <Loading />;

  if (patients.length === 0) {
    return (
      <Container className="d-flex justify-content-center align-items-center flex-column">
        <h4 className="mb-5"> 😴 No Appointment yet</h4>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <Table hover className="mt-3" variant="white">
            <caption className="caption-top">
              <SearchComponent
                handleOnChange={(e) => setSearchTerm(e.target.value)}
                placeholder={"Search patients..."}
                searchTerm={searchTerm}
              />
            </caption>
            <thead>
              <tr>
                <th>File No</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Address</th>
              </tr>
            </thead>

            <tbody>
              {filteredPatients.map((patient) => (
                <tr key={patient.id}>
                  <td>{patient.file_number}</td>
                  <td>{patient.first_name}</td>
                  <td>{patient.last_name}</td>
                  <td>{patient.address}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};
