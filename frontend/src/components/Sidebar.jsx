import { SidebarLink } from "./SidebarLinks";
import { Brand } from "./Brand";
import settings from "../assets/svg/settings.svg";
import balance from "../assets/svg/balance.svg";
import profile from "../assets/svg/profile.svg";
import appo from "../assets/svg/appo.svg";
import appo_new from "../assets/svg/appo_new.svg";
import patient from "../assets/svg/patient.svg";

export const DoctorSidebar = () => (
  <div className="p-3">
    <div className="d-flex flex-column gap-2">
      <Brand />
      <SidebarLink to="/doctor/appointments" icon={appo} text="Appointments" />
      <SidebarLink to="/doctor/patients" icon={patient} text="Patients" />
      <SidebarLink to="/doctor/profile" icon={profile} text="Profile" />
      <SidebarLink to="/doctor/bills" icon={balance} text="Bills" />
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
      <SidebarLink to="/patient/appointments" icon={appo} text="Appointments" />
      <SidebarLink to="/patient/appointments-new" icon={appo_new} text="New" />
      <SidebarLink to="/patient/bills" icon={balance} text="Bills" />
      <SidebarLink to="/patient/profile" icon={profile} text="Account" />
    </div>
  </div>
);
