export const storeTokens = (accessToken, refreshToken) => {
  localStorage.setItem("access", accessToken);
  localStorage.setItem("refresh", refreshToken);
};

export const ROLE = {
  ADMIN: "admin",
  DOCTOR: "doctor",
  RECEPTIONIST: "receptionist",
  NURSE: "nurse",
  LAB_TECH: "lab_tech",
  PHARMACIST: "pharmacist",
};

export const getAccessToken = () => {
  return localStorage.getItem("access");
};

export const getRefreshToken = () => {
  return localStorage.getItem("refresh");
};

export const removeTokens = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
};

export const isAuthenticated = () => {
  return getAccessToken() != null ? true : false;
};

export const filterPatients = (
  patients,
  searchTerm,
  fields = ["file_number", "first_name", "last_name", "address"]
) => {
  // Convert searchTerm to lowercase for case-insensitive comparison
  const searchQueryLower = searchTerm.toLowerCase();

  // If the searchTerm is empty, return all patients
  if (!searchTerm) {
    return patients;
  }

  return patients.filter((patient) => {
    // Check each field for a match
    return fields.some((field) => {
      const fieldValue = patient[field];
      // Ensure fieldValue is a string and convert to lowercase
      return (
        typeof fieldValue === "string" &&
        fieldValue.toLowerCase().includes(searchQueryLower)
      );
    });
  });
};

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
  const searchQueryLower = searchTerm.toLowerCase();

  // If the searchTerm is empty, return all appointments
  if (!searchTerm) {
    return appointments;
  }

  return appointments.filter((appointment) => {
    // Check each field for a match
    return fields.some((field) => {
      const fieldValue = appointment[field];
      // Ensure fieldValue is a string and convert to lowercase
      return (
        typeof fieldValue === "string" &&
        fieldValue.toLowerCase().includes(searchQueryLower)
      );
    });
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

/**
 * Formats a Django datetime string into a more readable format.
 * @param {string} djangoDateTime - The Django datetime string (ISO 8601 format).
 * @param {string} format - The desired output format (default is 'YYYY-MM-DD HH:mm:ss').
 * @returns {string} - The formatted date string.
 */
export const formatDjangoDateTime = (
  djangoDateTime,
  format = "YYYY-MM-DD HH:mm:ss"
) => {
  if (!djangoDateTime) return "";

  // Create a Date object from the Django datetime string
  const date = new Date(djangoDateTime);

  // Check if the date is valid
  if (isNaN(date.getTime())) return "";

  // Format the date based on the specified format
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false, // Use 24-hour format
  };

  // Format the date using toLocaleString
  const formattedDate = date.toLocaleString("en-US", options);

  // Return the formatted date
  return formattedDate.replace(",", ""); // Remove the comma for better formatting
};

export const getBackendErrorMessage = (error) => error.response?.data?.message;
