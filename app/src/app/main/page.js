"use client";
import MainMap from "@/app/components/map_components/MainMap";
import useAreaAuth from "@/app/components/hooks/useAreaAuth";

export default function LoginPage() {
  const { isAuthenticated, user } = useAreaAuth("protected");
  if (!isAuthenticated) return null;

  return (
    <div>
      <main>
        <MainMap></MainMap>
      </main>
    </div>
  );
}
