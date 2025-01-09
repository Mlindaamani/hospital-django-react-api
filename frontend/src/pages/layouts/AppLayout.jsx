import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { NavigationBar } from "../../components/NavigationBar";

export const AppLayout = () => {
  return (
    <Container fluid className="d-flex flex-column vh-100">
      {/* Navigation bar */}
      <NavigationBar />

      {/* Main content */}
      <main className="flex-grow-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer
        className="text-center py-3 mt-5"
        style={{ backgroundColor: "#f8f9fa" }}
      >
        @2024 ebotapi
      </footer>
    </Container>
  );
};
