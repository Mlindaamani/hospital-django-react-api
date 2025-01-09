import { Modal } from "react-bootstrap";
import { EditPrescription } from "../pages/Doctor/EditPrescription";
export const EditPrescrModal = ({
  size = "md",
  prescription,
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
        <EditPrescription
          prescription={prescription}
          title={"Edit Prescription"}
        />
      </Modal.Body>
    </Modal>
  );
};
