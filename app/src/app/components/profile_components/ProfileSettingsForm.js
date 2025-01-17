"use client";
import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import authService from "@/services/authService";

export default function ProfileSettingsForm() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      firstName: "",
      lastName: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, "Username must be at least 3 characters")
        .required("Username is required"),
      firstName: Yup.string()
        .min(2, "First name must be at least 2 characters")
        .required("First name is required"),
      lastName: Yup.string()
        .min(2, "Last name must be at least 2 characters")
        .required("Last name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      setSubmitting(true);
      try {
        await authService.updateProfile(values);
        setStatus({ success: "Profile updated successfully!" });
        setSubmitting(false);
      } catch (error) {
        setStatus({ error: error.message });
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      formik.setValues({
        username: currentUser.user.username || "",
        email: currentUser.user.email || "",
        firstName: currentUser.user.firstName || "",
        lastName: currentUser.user.lastName || "",
      });
    }
  }, [router]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col w-full">
        <div className="card w-full max-w-2xl shadow-2xl bg-base-100">
          <div className="card-body">
            <h2 className="card-title text-2xl justify-center mb-4">
              Profile Settings
            </h2>

            {formik.status?.error && (
              <div className="alert alert-error">
                <span>{formik.status.error}</span>
              </div>
            )}

            {formik.status?.success && (
              <div className="alert alert-success">
                <span>{formik.status.success}</span>
              </div>
            )}

            <form onSubmit={formik.handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label htmlFor="firstName" className="label">
                    <span className="label-text">First Name</span>
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    {...formik.getFieldProps("firstName")}
                    className="input input-bordered w-full"
                    placeholder="Enter your first name"
                  />
                  {formik.touched.firstName && formik.errors.firstName ? (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {formik.errors.firstName}
                      </span>
                    </label>
                  ) : null}
                </div>

                <div className="form-control">
                  <label htmlFor="lastName" className="label">
                    <span className="label-text">Last Name</span>
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    {...formik.getFieldProps("lastName")}
                    className="input input-bordered w-full"
                    placeholder="Enter your last name"
                  />
                  {formik.touched.lastName && formik.errors.lastName ? (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {formik.errors.lastName}
                      </span>
                    </label>
                  ) : null}
                </div>
              </div>

              <div className="form-control">
                <label htmlFor="username" className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  id="username"
                  type="text"
                  {...formik.getFieldProps("username")}
                  className="input input-bordered w-full"
                  placeholder="Enter your username"
                />
                {formik.touched.username && formik.errors.username ? (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {formik.errors.username}
                    </span>
                  </label>
                ) : null}
              </div>

              <div className="form-control">
                <label htmlFor="email" className="label">
                  <span className="label-text">Email Address</span>
                </label>
                <input
                  id="email"
                  type="email"
                  {...formik.getFieldProps("email")}
                  className="input input-bordered w-full"
                  placeholder="Enter your email"
                />
                {formik.touched.email && formik.errors.email ? (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {formik.errors.email}
                    </span>
                  </label>
                ) : null}
              </div>

              <div className="form-control mt-6">
                <button
                  type="submit"
                  disabled={formik.isSubmitting}
                  className="btn btn-primary w-full"
                >
                  {formik.isSubmitting
                    ? "Updating Profile..."
                    : "Update Profile"}
                </button>
              </div>

              <div className="form-control mt-2">
                <button
                  type="button"
                  onClick={() =>
                    router.push("/profile_settings/password_change")
                  }
                  className="btn btn-secondary w-full"
                >
                  Change Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
