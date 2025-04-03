import { Button, Container, ListGroup } from "react-bootstrap";
import { Error } from "../../components/Error";
import { EditPrescrModal } from "../../components/EditPrescrModal";
import { useState } from "react";
import { Loading } from "../../components/Loading";
import { Link } from "react-router-dom";
import { usePrescriptionStore } from "../../store/prescriptionStore";

export const Prescriptions = () => {
  const { prescriptions, loading, error, getPrescription, prescription } =
    usePrescriptionStore();

  const [show, setShow] = useState(false);

  const handleModelClose = () => {
    setShow(false);
  };

  const handleEditPrescription = async (prescriptionId) => {
    setShow(true);
    getPrescription(prescriptionId);
  };

  if (loading) return <Loading />;

  if (error) return <Error error={error.response.data.detail} />;

  if (prescriptions.length === 0) {
    return (
      <Container className="d-flex justify-content-center align-items-center flex-column">
        <p className="fs-2">😴No prescriptions yet!</p>
        <h5>
          <Link to="/doctor/appointments" className="text-decoration-none">
            Craete New Presciption
          </Link>
        </h5>
      </Container>
    );
  }

  return (
    <Container className="mt-5 p-3 fw-bold text-secondary d-flex justify-content-center align-items-center flex-wrap">
      {/* Edit prescription modal */}
      <EditPrescrModal
        show={show}
        onHide={handleModelClose}
        prescription={prescription}
      />
      ;
      {prescriptions.map((prescription) => (
        <ListGroup
          className="mt-3 mb-4 rounded-4 labtest w-75 ms-5"
          key={prescription.id}
        >
          <ListGroup.Item className="p-3 fs-4 text-light d-flex justify-content-between bg-success bg-opacity-50">
            <div> #{prescription.patient_file_number}</div>
            <div>{prescription.patient_name}</div>
          </ListGroup.Item>

          <ListGroup.Item className="p-3">
            Medicine: {prescription.medicines_name}
          </ListGroup.Item>

          <ListGroup.Item className="p-3">
            Instructions: {prescription.instructions}
          </ListGroup.Item>

          <ListGroup.Item className="p-3">
            DatePrescribed: {prescription.prescription_date}
          </ListGroup.Item>

          <ListGroup.Item className="p-3">
            Status: {prescription.status}
          </ListGroup.Item>

          <ListGroup.Item className="p-3">
            <Button
              variant="success p-2 w-25 opacity-50"
              size="sm"
              onClick={() => handleEditPrescription(prescription.id)}
            >
              Edit
            </Button>
          </ListGroup.Item>
        </ListGroup>
      ))}
    </Container>
  );
};
