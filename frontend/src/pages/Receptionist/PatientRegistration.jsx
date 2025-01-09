import React from "react";
import { loginSchema } from "../../schema/schemas";
import { useFormik } from "formik";

const initialValues = {
  username: "",
  password: "",
};

export const PatientRegistration = () => {
  const onSubmit = (value, action) => {
    new Promise((resolve) => setTimeout(resolve, 2000));
    action.resetForm();
  };

  const {
    values,
    handleBlur,
    touched,
    handleSubmit,
    handleChange,
    errors,
    isSubmitting,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: loginSchema,
    onSubmit,
  });

  return (
    <div className="mb-3 mt-3 vh-90 d-flex justify-content-center flex-column align-items-center">
      <form onSubmit={handleSubmit} autoComplete="off">
        <h4 className="text-start p-3 mb-3 mt-3"> + Add new Patient</h4>
        <div>
          <label htmlFor="username">
            Enter username
            <input
              type="text"
              name="username"
              id="username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter username..."
              className={
                errors.username && touched.username
                  ? "border-danger form-control"
                  : "form-control border-success"
              }
            />
            {errors.username && touched.username && (
              <small className="text-danger">{errors.username}</small>
            )}
          </label>
        </div>

        <div className="mb-3 mt-3">
          <label htmlFor="password" className="form-label">
            Enter password
            <input
              type="password"
              name="password"
              id="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter password..."
              className={
                errors.password && touched.password
                  ? "border-danger form-control"
                  : "form-control"
              }
            />
            {errors.password && touched.password && (
              <small className="text-danger">{errors.password}</small>
            )}
          </label>
        </div>

        <div className="mb-3 mt-3">
          <button
            type="submit"
            className="btn btn-success w-100"
            disabled={isSubmitting}
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};
