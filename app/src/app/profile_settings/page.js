"use client";
import useAreaAuth from "@/app/components/hooks/useAreaAuth";
import ProfileSettingsForm from "@/app/components/profile_components/ProfileSettingsForm";

export default function ProfileSettingsPage() {
  const { isAuthenticated, user } = useAreaAuth("protected");
  if (!isAuthenticated) return null;
  return <ProfileSettingsForm />;
}
