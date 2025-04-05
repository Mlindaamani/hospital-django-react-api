import { Button, Container, ListGroup, Row, Col } from "react-bootstrap";
import { EditPrescrModal } from "../../components/EditPrescrModal";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { usePrescriptionStore } from "../../store/prescriptionStore";
import { useModalStore } from "../../store/modalStore";

export const Prescriptions = () => {
  const { show, closeModal, openModal } = useModalStore();
  const { prescriptions, getPrescriptions, getPrescription } =
    usePrescriptionStore();

  useEffect(() => {
    getPrescriptions();
  }, [getPrescriptions]);

  const handleEditPrescription = async (prescriptionId) => {
    openModal();
    getPrescription(prescriptionId);
  };

  if (prescriptions.length === 0) {
    return (
      <Container className="d-flex justify-content-center align-items-center flex-column mt-5">
        <p className="fs-2">😴 No prescriptions yet!</p>
        <h5>
          <Link to="/doctor/appointments" className="text-decoration-none">
            Create New Prescription
          </Link>
        </h5>
      </Container>
    );
  }

  return (
    <Container className="mt-5 p-3">
      <Row className="g-4">
        {prescriptions.map((prescription) => (
          <Col key={prescription.id} xs={12} md={6} lg={4}>
            <ListGroup className="rounded-4 shadow-sm">
              <EditPrescrModal
                show={show}
                onHide={() => closeModal()}
                prescription={prescription}
              />
              <ListGroup.Item className="p-3 fs-5 text-light d-flex justify-content-between bg-success bg-opacity-50">
                <div>#{prescription.patient_file_number}</div>
                <div>{prescription.patient_name}</div>
              </ListGroup.Item>

              <ListGroup.Item className="p-3">
                Medicine: {prescription.medicines_name}
              </ListGroup.Item>

              <ListGroup.Item className="p-3">
                Instructions: {prescription.instructions}
              </ListGroup.Item>

              <ListGroup.Item className="p-3">
                Date Prescribed: {prescription.prescription_date}
              </ListGroup.Item>

              <ListGroup.Item className="p-3">
                Status: {prescription.status}
              </ListGroup.Item>

              <ListGroup.Item className="p-3">
                <Button
                  variant="success"
                  className="p-2 w-100 opacity-75"
                  size="sm"
                  onClick={() => handleEditPrescription(prescription.id)}
                >
                  Edit
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        ))}
      </Row>
    </Container>
  );
};
