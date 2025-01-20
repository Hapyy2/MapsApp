import React, { useRef, useState, useCallback } from "react";
import { useMap, AdvancedMarker, Pin } from "@vis.gl/react-google-maps";
import { Navigation } from "lucide-react";
import useRoute from "./useRoute";
import usePlaceAutocomplete from "./usePlaceAutocomplete";
import RouteInfo from "./RouteInfo";
import { SearchInput } from "./SearchInput";

export default function MapSearch() {
  const map = useMap();
  const [mapState, setMapState] = useState({
    showDestination: false,
    route: null,
    error: "",
    selectedLocation: null,
  });

  const originRef = useRef(null);
  const destinationRef = useRef(null);

  const { initializeRenderer, calculateRoute, clearRoute } = useRoute();

  React.useEffect(() => {
    const cleanup = initializeRenderer();
    return cleanup;
  }, [initializeRenderer]);

  const showError = useCallback((message) => {
    setMapState((prev) => ({ ...prev, error: message }));
    setTimeout(() => setMapState((prev) => ({ ...prev, error: "" })), 3000);
  }, []);

  const handlePlaceSelect = useCallback(
    (place, type) => {
      if (!place.geometry) {
        showError("No location details available for this place.");
        return;
      }

      if (type === "origin" && !destinationRef.current?.value) {
        const location = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        map?.panTo(location);
        map?.setZoom(15);
        setMapState((prev) => ({ ...prev, selectedLocation: location }));
      }

      if (
        type === "destination" ||
        (type === "origin" && destinationRef.current?.value)
      ) {
        calculateRoute(originRef.current.value, destinationRef.current.value)
          .then((route) => {
            setMapState((prev) => ({ ...prev, route }));
          })
          .catch((error) => {
            showError(error.message);
          });
      }
    },
    [map, showError, calculateRoute]
  );

  const clearSearch = useCallback(
    (type) => {
      if (type === "origin") {
        originRef.current.value = "";
        destinationRef.current.value = "";
        setMapState((prev) => ({
          ...prev,
          showDestination: false,
          route: null,
          selectedLocation: null,
        }));
      } else {
        destinationRef.current.value = "";
        setMapState((prev) => ({ ...prev, route: null }));
      }
      clearRoute();
    },
    [clearRoute]
  );

  usePlaceAutocomplete(originRef, true, (place) =>
    handlePlaceSelect(place, "origin")
  );
  usePlaceAutocomplete(destinationRef, mapState.showDestination, (place) =>
    handlePlaceSelect(place, "destination")
  );

  return (
    <>
      <div className="absolute top-4 left-4 z-10 w-full max-w-md">
        <div className="bg-base-100 rounded-lg shadow-lg p-4 space-y-4">
          <SearchInput
            ref={originRef}
            placeholder="Search for a location..."
            onClear={() => clearSearch("origin")}
            rightElement={
              <button
                onClick={() =>
                  setMapState((prev) => ({
                    ...prev,
                    showDestination: true,
                  }))
                }
                className="btn btn-primary btn-sm"
              >
                <Navigation size={16} />
              </button>
            }
          />

          {mapState.showDestination && (
            <SearchInput
              ref={destinationRef}
              placeholder="Search for destination..."
              onClear={() => clearSearch("destination")}
            />
          )}

          <RouteInfo route={mapState.route} />

          {mapState.error && (
            <div className="alert alert-error">
              <span>{mapState.error}</span>
            </div>
          )}
        </div>
      </div>

      {mapState.selectedLocation && (
        <AdvancedMarker position={mapState.selectedLocation}>
          <Pin
            scale={1}
            background={"#475569"}
            borderColor="#ffffff"
            glyphColor="#ffffff"
          />
        </AdvancedMarker>
      )}
    </>
  );
}
