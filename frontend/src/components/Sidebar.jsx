import { SidebarLink } from "./SidebarLinks";
import { Brand } from "./Brand";
import settings from "../assets/svg/settings.svg";
import balance from "../assets/svg/balance.svg";
import profile from "../assets/svg/profile.svg";

export const DoctorSidebar = () => (
  <div className="p-3">
    <div className="d-flex flex-column gap-2">
      <Brand />
      <SidebarLink
        to="/doctor/appointments"
        icon={balance}
        text="Appointments"
      />
      <SidebarLink to="/doctor/patients" icon={profile} text="Patients" />
      <SidebarLink to="/doctor/profile" icon={profile} text="Profile" />
      <SidebarLink to="/doctor/settings" icon={settings} text="Settings" />
    </div>
  </div>
);

export const ReceptionistSidebar = () => (
  <div className="p-3">
    <div className="d-flex flex-column gap-2">
      <Brand />
      <SidebarLink to="/receptionist/doctors" icon={balance} text="Doctors" />
      <SidebarLink to="/receptionist/profile" icon={profile} text="Profile" />
      <SidebarLink
        to="/receptionist/settings"
        icon={settings}
        text="Settings"
      />
    </div>
  </div>
);

export const PatientSidebar = () => (
  <div className="p-3">
    <div className="d-flex flex-column gap-2">
      <Brand />
      <SidebarLink
        to="/patient/appointments"
        icon={balance}
        text="My Appointments"
      />
      <SidebarLink to="/patient/new" icon={profile} text="New Appointment" />
      <SidebarLink to="/patient/profile" icon={settings} text="My Profile" />
    </div>
  </div>
);
