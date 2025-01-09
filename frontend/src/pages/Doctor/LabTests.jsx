import { Container, ListGroup } from "react-bootstrap";
import { Error } from "../../components/Error";
import { useFetch } from "../../hooks/useCustomFetch";
import { Loading } from "../../components/Loading";

export const LabTests = () => {
  const { data: labresults, loading, error } = useFetch("/labresults/");

  if (loading) return <Loading />;

  if (error) return <Error error={error.response.data.detail} />;

  return (
    <Container className="mt-5 p-3 fw-bold text-secondary d-flex justify-content-center align-items-center flex-wrap">
      {labresults.map((test) => (
        <ListGroup key={test.id} className="mt-3 mb-4 rounded-4 labtest w-75">
          <ListGroup.Item className="p-3 fs-4 text-light d-flex justify-content-between bg-success bg-opacity-50">
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
          <ListGroup.Item className="p-3">Status: {test.status}</ListGroup.Item>
          <ListGroup.Item className="p-3">
            Date-Conducted: {test.date_conducted}
          </ListGroup.Item>
          <ListGroup.Item className="p-3">
            Doctor-Specialization: {test.doctor_specialization}
          </ListGroup.Item>
        </ListGroup>
      ))}
    </Container>
  );
};