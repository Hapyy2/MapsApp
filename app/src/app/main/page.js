"use client";
import authService from "@/services/authService";
import MainMap from "@/app/components/map_components/MainMap";

export default function LoginPage() {
  console.log("Current Users:", authService.users);
  return (
    <div>
      <main>
        <MainMap></MainMap>
      </main>
      <footer></footer>
    </div>
  );
}
