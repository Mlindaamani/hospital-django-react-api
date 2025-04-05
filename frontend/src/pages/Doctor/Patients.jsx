import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table, Card } from "react-bootstrap";
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
      <Container className="d-flex justify-content-center align-items-center flex-column mt-5 text-center">
        <h4 className="mb-3 text-muted">😴 No Patients Registered Yet</h4>
        <p className="text-secondary">
          Start by adding a new patient to view them here.
        </p>
      </Container>
    );
  }

  return (
    <Container className="mt-2" fluid>
      <Row className="justify-content-center">
        <Col md={10}>
          <Card className="shadow-lg border-0 rounded-4 p-3">
            <h4 className="fw-semibold mb-4 text-primary">
              📋 Patient Records
            </h4>

            <SearchComponent
              handleOnChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search patients by name or file number..."
              searchTerm={searchTerm}
            />

            <div className="table-responsive mt-4">
              <Table striped hover borderless className="align-middle">
                <thead className="table-light">
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
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
