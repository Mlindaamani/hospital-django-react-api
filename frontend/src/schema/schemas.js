import * as yup from "yup";
export const loginSchema = yup.object({
  username: yup.string().min(3).max(5).required("The username is required"),
  password: yup.string().min(5).required("Password is required"),
});
