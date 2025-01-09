import React, { useState } from "react";
import { axiosInstance } from "../../services/api/config";

export const Nurse = () => {
  const [lecense, setLecense] = useState("");
  const [yox, setYox] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = axiosInstance.post("/nurses/profile/", {
        lecense_number: lecense,
        year_of_experience: yox,
      });
      console.log(response.data);
    } catch (error) {
      setError(error.response.data.detail);
      console.log(error.response.data);
    }
  };

  return (
    <div className="d-flex mt-5 mb-5">
      <form onSubmit={handleSubmit}>
        {error && <p className="text-danger">{error}</p>}
        <h2 className="text-center text-dark mb-3">Create Your profile</h2>
        <div>
          <label htmlFor="lecense" className="form-label">
            LECENSE NUMBER
            <input
              type="text"
              id="lecense"
              value={lecense}
              onChange={(e) => setLecense(e.target.value)}
              className="form-control"
            />
          </label>
        </div>
        <div>
          <label htmlFor="yox" className="form-label">
            YEAR OF EXPERIENCE
            <input
              type="text"
              id="yox"
              value={yox}
              onChange={(e) => setYox(e.target.value)}
              className="form-control"
            />
          </label>
        </div>
        <div>
          <button className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
};
