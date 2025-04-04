import { Outlet } from "react-router-dom";
import { DashboardHeader } from "../components/DashboardHeader";
import { DoctorSidebar } from "../components/Sidebar";

export const DoctorLayout = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div
          className="col-md-3 col-lg-2  text-white vh-100 p-0 overflow-auto"
          style={{ backgroundColor: "#2D4263" }}
        >
          <DoctorSidebar />
        </div>
        <div className="col-md-9 col-lg-10 p-0 bg-white">
          <div className="d-flex flex-column vh-100">
            <DashboardHeader />
            <div className="flex-grow-1 overflow-auto p-3">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
