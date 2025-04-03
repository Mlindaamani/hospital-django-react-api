import React from "react";
import { Modal } from "react-bootstrap";
import { useModalStore } from "../store/modalStore";
import { PrescriptionForm } from "../pages/Doctor/PrescriptionForm";

export const PrescriptionModal = () => {
  const { show, patientId, patientName, fileNumber, closeModal } =
    useModalStore();

  return (
    <Modal
      onHide={closeModal}
      show={show}
      centered={true}
      size="md"
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
