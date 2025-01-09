import React, { useState } from "react";
import { Col, Container, Form, InputGroup, Row, Button } from "react-bootstrap";
import { MedicineSelect } from "./MedicineSelect";
import { axiosInstance } from "../../services/api/config";


export const PrescriptionForm = ({
  patientId,
  patientName,
  fileNumber,
}) => {
  const [prescription, setPrescription] = useState({
    medicines: "",
    instructions: "",
    status: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setPrescription({ ...prescription, [name]: value });
  };

  const handlePrescriptionSubmit = async (e) => {
    e.preventDefault();

    const prescriptionData = {
      patient: patientId,
      medicines: prescription.medicines,
      instructions: prescription.instructions,
      status: prescription.status,
    };

    try {
      const response = await axiosInstance.post(
        "/prescriptions/",
        prescriptionData
      );
      console.log(response);
    } catch (error) {
      console.log(error.message);
      
    }
  };
  return (
    <Container>
      <Row>
        <Col md={12}>
          <div className="d-flex justify-content-between align-items-center border-bottom border-secondary">
            <h4 className="text-center text-secondary fw-bold">{fileNumber}</h4>
            <h5 className="text-center text-secondary fw-bold">
              {patientName}
            </h5>
          </div>
          <Form onSubmit={handlePrescriptionSubmit}>
            <Form.Group controlId="patient" className="mb-5 mt-5">
              <InputGroup>
                <InputGroup.Text>Medicines</InputGroup.Text>
                <MedicineSelect
                  hanleMedicineSelect={handleOnChange}
                  title="---Choose Medicines---"
                />
              </InputGroup>
            </Form.Group>

            <Form.Group controlId="instructions" className="mb-5">
              <InputGroup>
                <InputGroup.Text>Instructions</InputGroup.Text>
                <Form.Control
                  as={"textarea"}
                  onChange={handleOnChange}
                  name="instructions"
                  
                />
              </InputGroup>
            </Form.Group>

            <Form.Group controlId="status" className="mb-5">
              <InputGroup>
                <InputGroup.Text>Status</InputGroup.Text>
                <Form.Select size="lg" onChange={handleOnChange} name="status">
                  <option>Choose Status</option>
                  <option value="pending">Pending</option>
                  <option value="dispensed">Dispensed</option>
                </Form.Select>
              </InputGroup>
            </Form.Group>

            <Button
              className="p-3 text-center w-100 mt-3 bg-primary-subtle border-0 text-dark fw-bold"
              type="submit"
            >
              Save
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
