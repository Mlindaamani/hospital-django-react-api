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
import { Analytics } from "./components/Analytics";

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
          <Route index element={<Analytics />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="labresults" element={<h4>Lab Results</h4>} />
          <Route path="profile" element={<h4>Profile</h4>} />
          <Route path="settings" element={<h4>Settings</h4>} />
        </Route>

        {/* Receptionists */}
        <Route path="/receptionist" element={<ReceptionistLayout />}>
          <Route index element={<Analytics />} />
          <Route path="doctors" element={<h4>Doctors</h4>} />
          <Route path="settings" element={<h4>Doctors</h4>} />
          <Route path="profile" element={<h4>Profile</h4>} />
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
