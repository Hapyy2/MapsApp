"use client";
import LoginForm from "@/app/components/login_components/LoginForm";
import useAreaAuth from "@/app/components/hooks/useAreaAuth";

export default function LoginPage() {
  const { isAuthenticated } = useAreaAuth("auth");
  if (isAuthenticated) return null;

  return (
    <div>
      <LoginForm></LoginForm>
    </div>
  );
}
