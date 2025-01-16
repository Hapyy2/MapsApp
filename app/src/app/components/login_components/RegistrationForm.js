"use client";
import React, { useLayoutEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import authService from "@/services/authService";

export default function RegistrationForm() {
  const router = useRouter();

  useLayoutEffect(() => {
    // Redirect if already logged in
    if (authService.isAuthenticated()) {
      router.push("/main");
    }
  }, [router]);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
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
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(/[0-9]/, "Password requires at least 1 number")
        .matches(/[a-z]/, "Password requires at least 1 lowercase letter")
        .matches(/[A-Z]/, "Password requires at least 1 uppercase letter")
        .matches(/[^\w]/, "Password requires at least 1 symbol")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: async (values, { setSubmitting, setStatus, resetForm }) => {
      // Clear any previous status
      setStatus(null);

      try {
        setSubmitting(true);
        const { confirmPassword, ...newUserData } = values;

        // Simulate network delay to match login form behavior
        await new Promise((resolve) => setTimeout(resolve, 500));

        const response = await authService.addUser(newUserData);
        // Set success status
        setStatus({
          success: "Registration successful! Redirecting to login...",
        });
        resetForm();
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      } catch (error) {
        // Set error status
        setStatus({
          error: error.message || "Registration failed. Please try again.",
        });
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col w-full">
        <div className="card w-full max-w-2xl shadow-2xl bg-base-100">
          <div className="card-body">
            <h2 className="card-title text-2xl justify-center mb-4">
              Create a new account
            </h2>

            {formik.status?.error && (
              <div className="alert alert-error shadow-lg">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current flex-shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{formik.status.error}</span>
                </div>
              </div>
            )}

            {formik.status?.success && (
              <div className="alert alert-success shadow-lg">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current flex-shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{formik.status.success}</span>
                </div>
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
                  placeholder="Choose a username"
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

              <div className="form-control">
                <label htmlFor="password" className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  id="password"
                  type="password"
                  {...formik.getFieldProps("password")}
                  className="input input-bordered w-full"
                  placeholder="Choose a password"
                />
                {formik.touched.password && formik.errors.password ? (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {formik.errors.password}
                    </span>
                  </label>
                ) : null}
              </div>

              <div className="form-control">
                <label htmlFor="confirmPassword" className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  {...formik.getFieldProps("confirmPassword")}
                  className="input input-bordered w-full"
                  placeholder="Confirm your password"
                />
                {formik.touched.confirmPassword &&
                formik.errors.confirmPassword ? (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {formik.errors.confirmPassword}
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
                    ? "Creating Account..."
                    : "Create Account"}
                </button>
              </div>

              <p className="text-center text-sm mt-4">
                Already have an account?{" "}
                <a href="/login" className="link link-primary">
                  Sign in
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
