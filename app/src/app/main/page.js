"use client";
import authService from "@/services/authService";

export default function LoginPage() {
  console.log("Current Users:", authService.users);
  return (
    <div>
      <main></main>
      <footer></footer>
    </div>
  );
}
