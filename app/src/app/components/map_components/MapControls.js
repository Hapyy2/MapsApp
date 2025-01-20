import React, { useCallback } from "react";
import { Plus, Minus, Crosshair } from "lucide-react";
import { useMap } from "@vis.gl/react-google-maps";

export default function MapControls({ onCenterMap, isLocating }) {
  const map = useMap();

  const handleZoom = useCallback(
    (delta) => {
      if (map) {
        const newZoom = map.getZoom() + delta;
        map.setZoom(newZoom);
      }
    },
    [map]
  );

  return (
    <div className="absolute right-3 bottom-3 z-10">
      <div className="flex flex-col shadow-lg rounded-lg overflow-hidden">
        <button
          onClick={() => handleZoom(1)}
          className="btn btn-sm btn-square bg-base-100 rounded-none border-b border-base-300"
          title="Zoom in"
        >
          <Plus size={20} />
        </button>
        <button
          onClick={() => handleZoom(-1)}
          className="btn btn-sm btn-square bg-base-100 rounded-none border-b border-base-300"
          title="Zoom out"
        >
          <Minus size={20} />
        </button>
        <button
          onClick={onCenterMap}
          className="btn btn-sm btn-square bg-base-100 rounded-none"
          disabled={isLocating}
          title="Center on my location"
        >
          {isLocating ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            <Crosshair size={20} />
          )}
        </button>
      </div>
    </div>
  );
}
