import { SidebarLink } from "./SidebarLinks";
import { Brand } from "./Brand";
import settings from "../assets/svg/settings.svg";
import balance from "../assets/svg/balance.svg";
import person from "../assets/svg/person.svg";
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
      <SidebarLink to="/doctor/labresults" icon={person} text="LabResults" />
      <SidebarLink to="/doctor/settings" icon={settings} text="Settings" />
      <SidebarLink to="/doctor/profile" icon={profile} text="Profile" />
    </div>
  </div>
);

export const ReceptionistSidebar = () => (
  <div className="p-3">
    <div className="d-flex flex-column gap-2">
      <Brand />
      <SidebarLink to="/receptionist/doctors" icon={balance} text="Doctors" />
      <SidebarLink to="/receptionist/profile" icon={profile} text="Profile" />
      <SidebarLink to="/receptionist/settings" icon={settings} text="Settings" />
    </div>
  </div>
);
