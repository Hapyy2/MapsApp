"use client";
import useAreaAuth from "@/app/components/hooks/useAreaAuth";
import PasswordChangeForm from "@/app/components/profile_components/PasswordChangeForm";

export default function PasswordChangePage() {
  const { isAuthenticated, user } = useAreaAuth("protected");
  if (!isAuthenticated) return null;
  return <PasswordChangeForm />;
}
