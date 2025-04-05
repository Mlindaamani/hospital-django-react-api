import { useEffect } from "react";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import { Error } from "../../components/Error";
import { Loading } from "../../components/Loading";
import { useLabResultsStore } from "../../store/labresultsStore";
import { formatDjangoDateTime } from "../../utils/functions";

export const LabTests = () => {
  const { labresults, getLabResults, loading, error } = useLabResultsStore();

  useEffect(() => {
    getLabResults();
  }, [getLabResults]);

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;

  return (
    <Container className="mt-5 p-3">
      <Row className="g-5">
        {labresults.map((test) => (
          <Col key={test.id} xs={12} md={6} lg={4} className="mb-4">
            <ListGroup className="rounded-4 shadow-sm">
              <ListGroup.Item
                className="p-3 fs-5 text-light  d-flex justify-content-between"
                style={{ backgroundColor: "#2D4263" }}
              >
                <div>#{test.patient_file_number}</div>
                <div>{test.patient_name}</div>
              </ListGroup.Item>
              <ListGroup.Item className="p-3">
                Lab-Technician: {test.lab_technician_name}
              </ListGroup.Item>
              <ListGroup.Item className="p-3">
                Test-Type: {test.test_type}
              </ListGroup.Item>
              <ListGroup.Item className="p-3">
                Results: {test.result}
              </ListGroup.Item>
              <ListGroup.Item className="p-3">
                Status: {test.status}
              </ListGroup.Item>
              <ListGroup.Item className="p-3">
                Date-Conducted: {formatDjangoDateTime(test.date_conducted)}
              </ListGroup.Item>
              <ListGroup.Item className="p-3">
                Doctor-Specialization: {test.doctor_specialization}
              </ListGroup.Item>
            </ListGroup>
          </Col>
        ))}
      </Row>
    </Container>
  );
};
