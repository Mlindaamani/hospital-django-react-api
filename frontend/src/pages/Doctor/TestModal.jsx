import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useModalStore } from "../../store/stote";

export const TestModal = () => {
  const { show, hideModal } = useModalStore((state) => ({
    show: state.show,
    hideModal: state.hideModal,
  }));

  return (
    <div>
      <Modal
        show={show}
        onHide={hideModal}
        centered
        backdrop={"static"}
        size="md"
        keyboard={false}
      >
        <Modal.Header closeButton className="fw-bold text-center">
          PAY VIA <span className="text-success ms-2">GREY</span>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>USERNAME</Form.Label>
              <Form.Control placeholder="Enter your username..." />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>EMAIL</Form.Label>
              <Form.Control placeholder="Enter your email..." />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>ADDRESS</Form.Label>
              <Form.Control placeholder="Enter your address..." />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="border-top-0">
          <Button variant="success w-100 p-3" onClick={hideModal} size="sm">
            PAY $2000
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
