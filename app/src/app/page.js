"use client";
import useAreaAuth from "@/app/components/hooks/useAreaAuth";

export default function HomePage() {
  useAreaAuth("landing");
  return null;
}
