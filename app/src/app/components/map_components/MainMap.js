import React from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";

export default function MainMap() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  console.log(apiKey);
  return (
    <>
      <APIProvider apiKey={apiKey}>
        <Map
          style={{ width: "100vw", height: "100vh" }}
          defaultCenter={{ lat: 22.54992, lng: 0 }}
          defaultZoom={3}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
        />
      </APIProvider>
    </>
  );
}
