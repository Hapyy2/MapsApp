"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import authService from "@/services/authService";

export default function PasswordChangeForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string().required("Current password is required"),
      newPassword: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(/[0-9]/, "Password requires at least 1 number")
        .matches(/[a-z]/, "Password requires at least 1 lowercase letter")
        .matches(/[A-Z]/, "Password requires at least 1 uppercase letter")
        .matches(/[^\w]/, "Password requires at least 1 symbol")
        .notOneOf(
          [Yup.ref("currentPassword")],
          "New password must be different from current password"
        )
        .required("New password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: async (values, { setStatus, resetForm }) => {
      setIsSubmitting(true); // Use our custom state
      try {
        await authService.changePassword(
          values.currentPassword,
          values.newPassword
        );
        resetForm();
        setStatus({
          success: "Password changed successfully! Redirecting to login...",
        });

        setTimeout(() => {
          authService.logout();
          router.push("/login");
        }, 2000);
      } catch (error) {
        setStatus({ error: error.message });
        setIsSubmitting(false); // Only re-enable on error
      }
    },
  });

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col w-full">
        <div className="card w-full max-w-2xl shadow-2xl bg-base-100">
          <div className="card-body">
            <h2 className="card-title text-2xl justify-center mb-4">
              Change Password
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
              <div className="form-control">
                <label htmlFor="currentPassword" className="label">
                  <span className="label-text">Current Password</span>
                </label>
                <input
                  id="currentPassword"
                  type="password"
                  {...formik.getFieldProps("currentPassword")}
                  className="input input-bordered w-full"
                  placeholder="Enter your current password"
                  disabled={isSubmitting}
                />
                {formik.touched.currentPassword &&
                formik.errors.currentPassword ? (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {formik.errors.currentPassword}
                    </span>
                  </label>
                ) : null}
              </div>

              <div className="form-control">
                <label htmlFor="newPassword" className="label">
                  <span className="label-text">New Password</span>
                </label>
                <input
                  id="newPassword"
                  type="password"
                  {...formik.getFieldProps("newPassword")}
                  className="input input-bordered w-full"
                  placeholder="Enter your new password"
                  disabled={isSubmitting}
                />
                {formik.touched.newPassword && formik.errors.newPassword ? (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {formik.errors.newPassword}
                    </span>
                  </label>
                ) : null}
              </div>

              <div className="form-control">
                <label htmlFor="confirmPassword" className="label">
                  <span className="label-text">Confirm New Password</span>
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  {...formik.getFieldProps("confirmPassword")}
                  className="input input-bordered w-full"
                  placeholder="Confirm your new password"
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
                  className="btn btn-primary w-full"
                >
                  {isSubmitting ? "Please wait..." : "Change Password"}
                </button>
              </div>

              <div className="form-control mt-2">
                <button
                  type="button"
                  onClick={() => router.push("/profile_settings")}
                  className="btn btn-secondary w-full"
                  disabled={isSubmitting}
                >
                  Back to Profile Settings
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
