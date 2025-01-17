"use client";
import RegistrationForm from "@/app/components/login_components/RegistrationForm";
import useAreaAuth from "@/app/components/hooks/useAreaAuth";

export default function RegistrationPage() {
  const { isAuthenticated } = useAreaAuth("auth");
  if (isAuthenticated) return null;

  return (
    <div>
      <RegistrationForm></RegistrationForm>
    </div>
  );
}
