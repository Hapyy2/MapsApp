import React from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  useMap,
} from "@vis.gl/react-google-maps";
import { Plus, Minus, Crosshair } from "lucide-react";
import useGeolocation from "@/app/components/hooks/useGeolocation";

function MapContent() {
  const map = useMap();
  const {
    location: userLocation,
    error,
    isLocating,
    updateLocation,
  } = useGeolocation();

  const CustomMarker = () => (
    <div className="relative">
      <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-500/30 rounded-full animate-ping" />
      <div className="absolute -top-3 -left-3 w-6 h-6 bg-blue-500/50 rounded-full" />
      <div className="absolute -top-2 -left-2 w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg" />
    </div>
  );

  const handleZoom = (delta) => {
    if (map) {
      const newZoom = map.getZoom() + delta;
      map.setZoom(newZoom);
    }
  };

  const handleCenterMap = async () => {
    try {
      const location = await updateLocation();
      if (location && map) {
        map.panTo(location);
        map.setZoom(17);
      }
    } catch (err) {
      console.warn("Nie udało się wycentrować mapy:", err);
    }
  };

  return (
    <>
      {userLocation && (
        <AdvancedMarker position={userLocation} title="Twoja lokalizacja">
          <CustomMarker />
        </AdvancedMarker>
      )}

      {error && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
          <div className="alert alert-error shadow-lg bg-white max-w-md">
            <span>{error}</span>
          </div>
        </div>
      )}

      {isLocating && !error && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
          <div className="alert shadow-lg bg-white">
            <span>Pobieranie lokalizacji...</span>
          </div>
        </div>
      )}

      {/* Control buttons container */}
      <div className="absolute right-3 bottom-3 flex flex-col gap-[1px] z-10">
        {/* Zoom controls */}
        <button
          onClick={() => handleZoom(1)}
          className="bg-white rounded-t-sm shadow-lg p-2 hover:bg-gray-100 focus:outline-none"
          title="Przybliż"
          style={{
            cursor: "pointer",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Plus size={20} color="#666" />
        </button>
        <button
          onClick={() => handleZoom(-1)}
          className="bg-white p-2 hover:bg-gray-100 focus:outline-none"
          title="Oddal"
          style={{
            cursor: "pointer",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Minus size={20} color="#666" />
        </button>

        {/* Location button */}
        <button
          onClick={handleCenterMap}
          className="bg-white rounded-b-sm shadow-lg p-2 hover:bg-gray-100 focus:outline-none"
          disabled={isLocating}
          title="Centruj na mojej lokalizacji"
          style={{
            cursor: "pointer",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {isLocating ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            <Crosshair size={20} color="#666" />
          )}
        </button>
      </div>
    </>
  );
}

export default function MainMap() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID;
  const defLat = 54.3956665803302;
  const defLng = 18.573482430800638;
  const defZoom = 15;

  if (!apiKey || !mapId) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p>Brak wymaganej konfiguracji. Sprawdź zmienne środowiskowe.</p>
      </div>
    );
  }

  return (
    <div className="w-full h-screen relative">
      <APIProvider apiKey={apiKey}>
        <Map
          mapId={mapId}
          defaultZoom={defZoom}
          defaultCenter={{ lat: defLat, lng: defLng }}
          gestureHandling="greedy"
          options={{
            disableDefaultUI: true,
            mapTypeControl: true,
            mapTypeControlOptions: {
              position: 3, // TOP_RIGHT
              style: 1, // HORIZONTAL_BAR
              mapTypeIds: ["roadmap", "satellite"],
            },
            zoomControl: false,
            streetViewControl: false,
            fullscreenControl: false,
            minZoom: 3,
            maxZoom: 20,
            scaleControl: false,
            rotateControl: false,
            mapTypeId: "roadmap",
            tilt: 0,
            clickableIcons: false,
            styles: [
              {
                featureType: "poi",
                elementType: "labels",
                stylers: [{ visibility: "off" }],
              },
              {
                selector: "#iframe_companion",
                styles: {
                  display: "none !important",
                },
              },
            ],
            backgroundColor: "white",
          }}
          className="w-full h-full [&_.gm-style-cc]:!hidden [&_.gm-style-pbc]:!hidden"
        >
          <MapContent />
        </Map>
      </APIProvider>
    </div>
  );
}
