import React from "react";

export default function MapAlerts({ error, isLocating }) {
  if (!error && !isLocating) return null;

  return (
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
      {error ? (
        <div className="alert alert-error shadow-lg">
          <span>{error}</span>
        </div>
      ) : isLocating ? (
        <div className="alert alert-info shadow-lg">
          <span>Getting location...</span>
        </div>
      ) : null}
    </div>
  );
}
