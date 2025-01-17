import React from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";

export default function MainMap() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID;
  const defLat = 54.3956665803302;
  const defLng = 18.573482430800638;
  const defZoom = 15;

  if (!apiKey || !mapId) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p>
          Missing required configuration. Please check your environment
          variables.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-screen">
      <APIProvider apiKey={apiKey}>
        <Map
          mapId={mapId}
          style={{ width: "100%", height: "100%" }}
          defaultZoom={defZoom}
          defaultCenter={{ lat: defLat, lng: defLng }}
          gestureHandling={"greedy"}
          options={{
            renderingType: "VECTOR",
          }}
        />
      </APIProvider>
    </div>
  );
}
