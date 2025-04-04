import { useNavigate, Link } from "react-router-dom";
import { Image } from "react-bootstrap";
import sound from "../assets/svg/sound.svg";
import { useAuthStore } from "../store/AuthStore";

export const NavigationBar = () => {
  const { isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark p-4 chat-app"
      data-bs-theme="dark"
    >
      <div className="container-fluid auth-bg">
        <Link
          className="navbar-brand d-flex gap-2 justify-content-center align-items-center fw-bold fs-4 text-light"
          to="/"
        >
          <Image src={sound} />
          eChat
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link">Features</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#price">
                Pricing
              </Link>
            </li>

            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/analytics">
                    Dashboard
                  </Link>
                </li>

                <li className="nav-item">
                  <button
                    className="nav-link btn btn-link text-light"
                    onClick={() => {
                      logout(navigate);
                    }}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Signup
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
