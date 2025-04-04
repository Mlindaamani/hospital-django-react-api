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

export const navigateTo = (user) => {
  switch (user.role) {
    case ROLE.ADMIN:
      return "/admin";
    case ROLE.DOCTOR:
      return "/doctor";
    case ROLE.RECEPTIONIST:
      return "/receptionist";
    case ROLE.NURSE:
      return "/nurse";
    case ROLE.LAB_TECH:
      return "/lab_tech/";
    case ROLE.PHARMACIST:
      return "/pharmacist";
    default:
      return "/";
  }
};

export const redirectTo = (navigate, role) => {
  switch (role) {
    case ROLE.DOCTOR:
      navigate("/doctor/");
      break;

    case ROLE.ADMIN:
      window.location.href = "http://localhost:8000/admin/";
      break;

    case ROLE.RECEPTIONIST:
      navigate("/receptionist/", { replace: true });
      break;

    case ROLE.NURSE:
      navigate("/nurse/", { replace: true });
      break;

    case ROLE.LAB_TECH:
      navigate("/labtech/", { replace: true });
      break;

    case ROLE.PHARMACIST:
      navigate("/pharmacist/", { replace: true });
      break;

    default:
      navigate("/", { replace: true });
      break;
  }
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

  // Check if the date is valid
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

export const getBackendErrorMessage = (error) => error.response?.data?.message;

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
