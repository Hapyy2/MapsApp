import React from "react";

export default function RouteInfo({ route }) {
  if (!route) return null;

  return (
    <div className="flex justify-between items-center text-sm">
      <span>Distance: {route.distance}</span>
      <span>Duration: {route.duration}</span>
    </div>
  );
}
