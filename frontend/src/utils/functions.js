export const storeTokens = (accessToken, refreshToken) => {
  localStorage.setItem("access", accessToken);
  localStorage.setItem("refresh", refreshToken);
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

export const ROLE = {
  DOCTOR: "doctor",
  RECEPTIONIST: "receptionist",
  PATIENT: "patient",
  LAB_TECH: "lab_tech",
};

export const dashboardTitle = (user) => {
  if (user.role === ROLE.DOCTOR) return "Doctor Dashboard";
  if (user.role === ROLE.RECEPTIONIST) return "Receptionist Dashboard";
  if ((user.role = ROLE.PATIENT)) return "Patient Dashboard";
  if ((user.role = ROLE.LAB_TECH)) return "LabTech Dashboard";
};

export const TOAST_POSITION = {
  TOP_LEFT: "top-left",
  TOP_RIGHT: "top-right",
  BOTTOM_LEFT: "bottom-left",
  BOTTOM_RIGHT: "bottom-right",
  TOP_CENTER: "top-center",
  BOTTOM_CENTER: "bottom-center",
  CENTER: "center",
  CENTER_LEFT: "center-left",
  CENTER_RIGHT: "center-right",
  LEFT: "left",
};

export const navigateTo = (user) => {
  switch (user.role) {
    case ROLE.DOCTOR:
      return "/doctor";

    case ROLE.RECEPTIONIST:
      return "/receptionist";

    case ROLE.LAB_TECH:
      return "/lab_tech/";

    case ROLE.PATIENT:
      return "/patient";

    default:
      return "/";
  }
};

export const redirectTo = (navigate, role) => {
  switch (role) {
    case ROLE.DOCTOR:
      navigate("/doctor/");
      break;

    case ROLE.PATIENT:
      navigate("/patient/");
      break;

    case ROLE.RECEPTIONIST:
      navigate("/receptionist/", { replace: true });
      break;

    case ROLE.LAB_TECH:
      navigate("/labtech/", { replace: true });
      break;

    case ROLE.PATIENT:
      navigate("/patient/", { replace: true });
      break;

    default:
      navigate("/", { replace: true });
      break;
  }
};

export const filterPatients = (
  patients,
  searchTerm,
  fields = ["file_number", "first_name", "last_name", "address"]
) => {
  const searchQueryLower = searchTerm.toLowerCase();

  if (!searchTerm) {
    return patients;
  }

  return patients.filter((patient) => {
    // Check each field for a match
    return fields.some((field) => {
      const fieldValue = patient[field];
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

  if (!searchTerm) {
    return appointments;
  }

  return appointments.filter((appointment) => {
    // Check each field for a match
    return fields.some((field) => {
      const fieldValue = appointment[field];
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
      return "text-warning fw-bold";

    case "Cancelled":
      return "text-danger fw-bold";

    case "Completed":
      return "text-success fw-bold text-decoration-line-through";

    default:
      return "text-secondary fw-bold";
  }
};

export const formatDjangoDateTime = (djangoDateTime) => {
  if (!djangoDateTime) return "";

  const date = new Date(djangoDateTime);

  if (isNaN(date.getTime())) return "";

  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  const formattedDate = date.toLocaleString("en-US", options);

  return formattedDate.replace(",", "");
};

export const getBackendErrorMessage = (error) =>
  error.response?.data?.non_field_errors ||
  error.response?.data?.detail ||
  error.response.data.message ||
  "An error occurred";

export const roleBadgeColor = (role) => {
  switch (role) {
    case "admin":
      return "bg-danger";
    case "moderator":
      return "bg-warning text-dark";
    case "guest":
      return "bg-secondary";
    default:
      return "bg-primary";
  }
};
