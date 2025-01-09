import { Tabs, Tab, Container } from "react-bootstrap";
import { NewAppointment } from "./NewAppointment";
import { StaffRegistration } from "./StaffRegistration";
import { PatientRegistration } from "./PatientRegistration";
import { Nurse } from "./Nurse";

export const ReceptionistDashboard = () => {
  return (
    <Container className="mt-5 mb-5 vh-100 justify-content-center align-items-center flex-column">
      <Tabs defaultActiveKey={"add-staff"} transition variant="underline">
        <Tab eventKey="add-staff" title="Add Staff">
          <h5 className="text-center mt-5 ">+ Register A Staff</h5>
          <StaffRegistration />
        </Tab>

        <Tab eventKey="labTests" title="New Appointment">
          <NewAppointment />
        </Tab>

        <Tab eventKey="add-patient" title="Add Patient">
          <PatientRegistration />
        </Tab>

        <Tab eventKey="profile" title="Profile">
          <Nurse />
        </Tab>
      </Tabs>
    </Container>
  );
};
