import { Routes, Route } from "react-router-dom";
import { AuthRequired } from "./layouts/AuthRequired";
import { AppLayout } from "./layouts/AppLayout";
import { LandingPage } from "./layouts/LandingPage";
import { NotFoundPage } from "./layouts/NoFound";
import { AuthLayout } from "./layouts/AuthLayout";
import { ReceptionistLayout } from "./layouts/ReceptionistLayout";
import { DoctorLayout } from "./layouts/DoctorLayout";

export const App = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<LandingPage />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<h2>Login Now</h2>} />
      </Route>

      <Route element={<AuthRequired />}>
        {/* Doctors */}
        <Route path="/doctor" element={<DoctorLayout />}>
          <Route index element={<h1>Analytics</h1>} />
          <Route path="appointments" element={<h1>Appointments</h1>} />
          <Route path="labresults" element={<h1>Lab Results</h1>} />
          <Route path="profile" element={<h1>Profile</h1>} />
          <Route path="settings" element={<h1>Settings</h1>} />
        </Route>

        {/* Receptionists */}
        <Route path="/receptionist" element={<ReceptionistLayout />}>
          <Route index element={<h1>Analytics</h1>} />
          <Route path="doctors" element={<h1>Doctors</h1>} />
          <Route path="settings" element={<h1>Doctors</h1>} />
          <Route path="profile" element={<h1>Profile</h1>} />
        </Route>

        {/* Lab Technicians */}
        {/* <Route path="/technician" element={<LabTechnicianLayout />}>
          <Route index element={<h1>Patients</h1>} />
          <Route path="doctors" element={<h1>Doctors</h1>} />
          <Route path="profile" element={<h1>Profile</h1>} />
          <Route path="settings" element={<h1>Settings</h1>} />
        </Route> */}

        {/* Patients */}
        {/* <Route path="/patient" element={<PatientLayout />}>
          <Route index element={<h1>Appointments</h1>} />
          <Route path="doctors" element={<h1>Doctors</h1>} />
          <Route path="profile" element={<h1>Profile</h1>} />
          <Route path="settings" element={<h1>Settings</h1>} />
        </Route> */}
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

// import { Routes, Route } from "react-router-dom";

// export const App = () => {
//   return (
//     <Routes>
//       <Route element={<AppLayout />}>
//         <Route path="/" element={<LandingPage />} />
//       </Route>

//       <Route element={<AuthLayout />}>
//         <Route path="/login" element={<h2>Login Now</h2>} />
//       </Route>

//       <Route element={<AuthRequired />}>
//         {/* Doctors */}
//         <Route element={<DoctordLayout />}>
//           <Route path="/analytics" element={<h1>Analytics</h1>} />
//           <Route path="/appointments" element={<h1>Appointments</h1>} />
//           <Route path="/labresults" element={<h1>Lab results</h1>} />
//           <Route path="/settings" element={<h1>Your Settings</h1>} />
//           <Route path="/profile" element={<h1>Your Profile</h1>} />
//         </Route>

//         {/* Receptionists */}
//         <Route element={<ReceptionistLayout />} path="receptionist">
//           <Route index path="patients" element={<h1>Patients</h1>} />
//           <Route path="doctors" element={<h1>Doctors</h1>} />
//           <Route path="profile" element={<h1>Profile</h1>} />
//           <Route path="settings" element={<h1>Your Settings</h1>} />
//         </Route>

//         {/* Lab Technicians */}
//         <Route element={<LabTechnicianLayout />} path="technician">
//           <Route index path="patients" element={<h1>Patients</h1>} />
//           <Route path="doctors" element={<h1>Doctors</h1>} />
//           <Route path="patients" element={<h1>Profile</h1>} />
//           <Route path="settings" element={<h1>Your Settings</h1>} />
//         </Route>

//         {/* Patients */}
//         <Route element={<PatientLayout />} path="patients">
//           <Route index path="appointments" element={<h1>Patients</h1>} />
//           <Route path="doctors" element={<h1>Doctors</h1>} />
//           <Route path="patients" element={<h1>Profile</h1>} />
//           <Route path="settings" element={<h1>Your Settings</h1>} />
//         </Route>
//       </Route>
//       <Route path="*" element={<NotFoundPage />} />
//     </Routes>
//   );
// };
