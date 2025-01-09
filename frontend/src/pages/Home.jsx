import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="mt-5 mb-5 text-center bg-success text-white p-5 d-flex justify-content-between gap-4 align-items-center">
      <h3> Welcome to EbotCare API.</h3>
      <button
        onClick={() => navigate("/receptionist/")}
        className="btn btn-outline-warning text-light bg-opacity-50"
      >
        Go to Dashboard
      </button>
    </div>
  );
};
