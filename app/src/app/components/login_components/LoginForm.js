"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import authService from "@/services/authService";

export default function LoginForm() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
    }),
    onSubmit: (values, { setSubmitting, setErrors }) => {
      setSubmitting(true);
      authService
        .login(values)
        .then(async (response) => {
          await router.push("/main");
        })
        .catch((error) => {
          setErrors({
            email: "Invalid credentials",
            password: "Invalid credentials",
          });
          setSubmitting(false);
        });
    },
  });

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col">
        <div className="card w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <h2 className="card-title text-2xl justify-center">
              Sign in to your account
            </h2>
            <p className="text-center text-sm">
              Or{" "}
              <a href="/register" className="link link-primary">
                create a new account
              </a>
            </p>

            <form onSubmit={formik.handleSubmit} className="space-y-4">
              <div className="form-control">
                <label htmlFor="email" className="label">
                  <span className="label-text">Email address</span>
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
                  placeholder="Enter your password"
                />
                {formik.touched.password && formik.errors.password ? (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {formik.errors.password}
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
                  {formik.isSubmitting ? "Signing in..." : "Sign in"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
