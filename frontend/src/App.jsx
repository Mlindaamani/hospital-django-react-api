import { Routes, Route } from "react-router-dom";
import "./App.css";
import { AuthRequired } from "./components/ProtectedRoutes";
import { NotFound } from "./components/NotFound";
import { Login } from "./Auth/Login";
import { HomePage } from "./pages/Home";
import { AppLayout } from "./pages/layouts/AppLayout";
import { DoctorLayout } from "./pages/layouts/DoctorLayout";
import { ReceptionistLayout } from "./pages/layouts/ReceptionistLayout";
import { ReceptionistDashboard } from "./pages/Receptionist/ReceptionistDashboard";
import { DoctorDashboard } from "./pages/Doctor/DoctorDashboard";
import { Appointments } from "./pages/Doctor/Appointments";
import { Patients } from "./pages/Doctor/Patients";
import { Prescriptions } from "./pages/Doctor/Prescriptions";
import { LabTests } from "./pages/Doctor/LabTests";
import { AppointmentDetail } from "./pages/Doctor/AppointmentDetail";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route element={<AuthRequired />}>
          {/* Doctor's Routes */}
          <Route path="doctor" element={<DoctorLayout />}>
            <Route index element={<DoctorDashboard />} />
            <Route path="appointments" element={<Appointments />} />
            <Route path="appointments/:id" element={<AppointmentDetail />} />
            <Route path="patients" element={<Patients />} />
            <Route path="prescriptions" element={<Prescriptions />} />
            <Route path="labtests" element={<LabTests />} />
          </Route>
          {/* Receptionist Route */}
          <Route path="receptionist" element={<ReceptionistLayout />}>
            <Route index element={<ReceptionistDashboard />} />
          </Route>
        </Route>

        <Route path="login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};
