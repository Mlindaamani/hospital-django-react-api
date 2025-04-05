import { Routes, Route } from "react-router-dom";
import { LoginForm } from "./pages/auth/LoginForm";
import { Appointments } from "./pages/doctor/Appointments";
import { LandingPage } from "./pages/LandingPage";
import { NotFoundPage } from "./pages/NoFound";
import { AuthRequired } from "./layouts/AuthRequired";
import { AppLayout } from "./layouts/AppLayout";
import { AuthLayout } from "./layouts/AuthLayout";
import { ReceptionistLayout } from "./layouts/ReceptionistLayout";
import { DoctorLayout } from "./layouts/DoctorLayout";
import { PatientLayout } from "./layouts/PatientLayout";
import { Analytics } from "./components/Analytics";
import { LabTests } from "./pages/doctor/LabTests";
import { Patients } from "./pages/doctor/Patients";
import { DoctorSettings } from "./pages/doctor/Settings";
import { Profile } from "./pages/doctor/Profile";
import { DoctorAnalytics } from "./pages/doctor/DoctorAnalytics";
import { AppointmentForm } from "./pages/patient/Appointment"; 


export const App = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<LandingPage />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginForm />} />
      </Route>

      <Route element={<AuthRequired />}>
        {/* Doctors */}
        <Route path="/doctor" element={<DoctorLayout />}>
          <Route index element={<DoctorAnalytics />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="labresults" element={<LabTests />} />
          <Route path="profile" element={<Profile />} />
          <Route path="patients" element={<Patients />} />
          <Route path="settings" element={<DoctorSettings />} />
        </Route>

        {/* Receptionists */}
        <Route path="/receptionist" element={<ReceptionistLayout />}>
          <Route index element={<Analytics />} />
          <Route path="doctors" element={<h4>Doctors</h4>} />
          <Route path="settings" element={<h4>Doctors</h4>} />
          <Route path="profile" element={<h4>Profile</h4>} />
        </Route>

        {/* Patient */}
        <Route path="/patient" element={<PatientLayout />}>
          <Route index element={<Analytics />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="new" element={<AppointmentForm />} />
          <Route path="profile" element={<h4>Profile</h4>} />
          <Route path="settings" element={<h4>Settings</h4>} />
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
