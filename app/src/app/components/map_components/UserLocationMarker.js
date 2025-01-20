import React from "react";
import { AdvancedMarker } from "@vis.gl/react-google-maps";

export default function UserLocationMarker({ position }) {
  if (!position) return null;

  return (
    <AdvancedMarker position={position} title="Your location">
      <div className="relative">
        <div className="absolute -top-4 -left-4 w-8 h-8 bg-primary/30 rounded-full animate-ping" />
        <div className="absolute -top-3 -left-3 w-6 h-6 bg-primary/50 rounded-full" />
        <div className="absolute -top-2 -left-2 w-4 h-4 bg-primary rounded-full border-2 border-base-100 shadow-lg" />
      </div>
    </AdvancedMarker>
  );
}
