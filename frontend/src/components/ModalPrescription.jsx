import { Modal } from "react-bootstrap";
import { PrescriptionForm } from "../pages/Doctor/PrescriptionForm";

export const PrescriptionModal = ({
  patientId,
  patientName,
  fileNumber,
  size = "md",
  show,
  onHide,
  centered = true,
}) => {
  return (
    <Modal
      onHide={onHide}
      show={show}
      centered={centered}
      size={size}
      scrollable={true}
      backdrop={true}
      backdropClassName="bg-dark bg-body-opacity-50"
    >
      <Modal.Header closeButton className="border-bottom-0" />
      <Modal.Body>
        <PrescriptionForm
          patientId={patientId}
          patientName={patientName}
          fileNumber={fileNumber}
        />
      </Modal.Body>
    </Modal>
  );
};
