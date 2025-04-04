import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";
import chat from "../assets/svg/chat.svg";
import secure from "../assets/svg/secure.svg";
import socket from "../assets/svg/socket.svg";

export const LandingPage = () => {
  return (
    <div className="d-flex flex-column flex-grow-1 bg-light chat-app">
      {/* Hero Section */}
      <div className="container text-center py-5 mt-2">
        <h1 className="display-3 fw-bold text-light">Connect. Chat. Thrive.</h1>
        <p className="lead text-light">
          Experience seamless real-time communication with eChat.
        </p>
        <div className="mt-5">
          <Link to="/" className="btn btn-light btn-lg me-3">
            Get Started
          </Link>
          <Link to="/" className="btn btn-outline-light btn-lg">
            Learn More
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="container py-2 mt-5">
        <h1 className="text-light text-center p-3 mt-2 mb-3">Features</h1>
        <div className="row">
          <div className="col-md-4 text-center">
            <Image
              src={chat}
              className="mb-3 feature-icons"
              style={{ width: "80px" }}
            />
            <h3 className="text-warning">Real-Time Messaging</h3>
            <p className="text-light lead">
              Chat instantly with friends, family, or colleagues.
            </p>
          </div>

          <div className="col-md-4 text-center">
            <Image
              src={secure}
              className="mb-3 feature-icons"
              style={{ width: "80px" }}
            />
            <h3 style={{ color: "#FFF" }}>Secure & Private</h3>
            <p className="lead text-light">
              Your conversations are encrypted and safe.
            </p>
          </div>

          <div className="col-md-4 text-center">
            <Image
              src={socket}
              className="mb-3 feature-icons"
              style={{ width: "80px" }}
            />
            <h3 style={{ color: "#75FB4C" }}>Cross-Platform</h3>
            <p className="text-light lead">
              Access eChat on any device, anywhere.
            </p>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="container py-5 mt-5">
        <h1 className="text-light text-center p-3 mt-2 mb-3">Pricing</h1>
        <h5 className="text-center mt-5 mb-5 text-light mt-5">
          Coming Soon...
        </h5>
      </div>
    </div>
  );
};
