export const storeTokens = (accessToken, refreshToken) => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
};

export const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

export const getRefreshToken = () => {
  return localStorage.getItem("refreshToken");
};

export const removeTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};


export const isAuthenticated = () => {
  return getAccessToken() != null ? true : false;
};


export const filterPatients = (
  patients,
  searchTerm,
  fields = ["file_number", "first_name", "last_name", "address"]
) =>
  patients.filter((patient) => {
    for (const field of fields) {
      const fieldValueLower = patient[field].toLowerCase();
      const searchQueryLower = searchTerm.toLowerCase();
      if (fieldValueLower.includes(searchQueryLower)) {
        return true;
      }
    }
    return false;
  });

export const filterAppointmentByCustomFields = (
  appointments,
  searchTerm,
  fields = [
    "patient_file_number",
    "patient_name",
    "doctor_name", 
    "doctor_specialization",
    "status",
    "reason",
  ]
) => {
  return appointments.filter((patient) => {
    for (const field of fields) {
      const fieldValueLower = patient[field].toLowerCase();
      const searchQueryLower = searchTerm.toLowerCase();
      if (fieldValueLower.includes(searchQueryLower)) {
        return true;
      }
    }
    return false;
  });
};

export const colorStatus = (status) => {
  switch (status) {
    case "Scheduled":
      return "text-warning fw-bold fs-5";
    case "Cancelled":
      return "text-danger fw-bold fs-5";
    case "Completed":
      return "text-success fw-bold fs-5 text-decoration-line-through";
    default:
      return "text-secondary fw-bold fs-5";
  }
};
