import React from "react";
import { AdvancedMarker, Pin } from "@vis.gl/react-google-maps";

export default function PlaceMarkers({ places, onPlaceClick }) {
  return (
    <>
      {places.map((place) => (
        <AdvancedMarker
          key={place.id}
          position={{ lat: place.lat, lng: place.lng }}
          onClick={() => onPlaceClick(place)}
        >
          <Pin
            scale={1}
            background={place.pinColor?.background || "#475569"}
            borderColor={place.pinColor?.borderColor || "#ffffff"}
            glyphColor={place.pinColor?.glyphColor || "#ffffff"}
          />
        </AdvancedMarker>
      ))}
    </>
  );
}
