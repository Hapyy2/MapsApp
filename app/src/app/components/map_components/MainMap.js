import React, { useEffect, useRef, useCallback } from "react";
import { APIProvider, Map, useMap } from "@vis.gl/react-google-maps";
import useGeolocation from "@/app/components/hooks/useGeolocation";
import useMapState from "@/app/components/hooks/useMapState";
import UserLocationMarker from "./UserLocationMarker";
import MapControls from "./MapControls";
import PlaceMarkers from "./PlaceMarkers";
import MapAlerts from "./MapAlerts";
import MapSearch from "./MapSearch/MapSearch";
import UserControl from "./UserControl";
import PlaceModal from "./PlaceModal/PlaceModal";
import placeService from "@/services/placeService";

function MapContent() {
  const map = useMap();
  const [mapState, updateMapState] = useMapState();
  const mapClickListenerRef = useRef(null);

  const {
    location: userLocation,
    error: locationError,
    isLocating,
    updateLocation,
  } = useGeolocation();

  // Load places
  useEffect(() => {
    const loadPlaces = () => {
      try {
        const userPlaces = placeService.getAllPlaces();
        updateMapState({ places: userPlaces });
      } catch (error) {
        updateMapState({ error: "Failed to load places" });
      }
    };

    loadPlaces();
  }, [updateMapState]);

  // Handle map double click
  useEffect(() => {
    if (!map || !window.google) return;

    const handleDoubleClick = (event) => {
      if (event.latLng) {
        updateMapState({
          selectedLocation: {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
          },
          selectedPlace: null,
          modalOpen: true,
        });
      }
    };

    mapClickListenerRef.current = window.google.maps.event.addListener(
      map,
      "dblclick",
      handleDoubleClick
    );

    return () => {
      if (mapClickListenerRef.current) {
        window.google.maps.event.removeListener(mapClickListenerRef.current);
      }
    };
  }, [map, updateMapState]);

  const handlePlaceClick = useCallback(
    (place) => {
      updateMapState({
        selectedPlace: place,
        selectedLocation: null,
        modalOpen: true,
      });
    },
    [updateMapState]
  );

  const handlePlaceModalClose = useCallback(() => {
    updateMapState({
      modalOpen: false,
      selectedPlace: null,
      selectedLocation: null,
    });
  }, [updateMapState]);

  const handleCenterMap = useCallback(async () => {
    try {
      const location = await updateLocation();
      if (location && map) {
        map.panTo(location);
        map.setZoom(17);
      }
    } catch (err) {
      console.warn("Failed to center map:", err);
    }
  }, [map, updateLocation]);

  const handlePlaceChange = useCallback(
    (type, place) => {
      updateMapState((current) => {
        const updatedPlaces = [...current.places];

        switch (type) {
          case "add":
            return { ...current, places: [...updatedPlaces, place] };
          case "update":
            const index = updatedPlaces.findIndex((p) => p.id === place.id);
            if (index !== -1) updatedPlaces[index] = place;
            return { ...current, places: updatedPlaces };
          case "delete":
            return {
              ...current,
              places: updatedPlaces.filter((p) => p.id !== place.id),
            };
          default:
            return current;
        }
      });
    },
    [updateMapState]
  );

  return (
    <>
      <MapSearch />
      <UserControl />
      <UserLocationMarker position={userLocation} />
      <PlaceMarkers places={mapState.places} onPlaceClick={handlePlaceClick} />
      <PlaceModal
        isOpen={mapState.modalOpen}
        onClose={handlePlaceModalClose}
        place={mapState.selectedPlace}
        position={mapState.selectedLocation}
        onPlaceChange={handlePlaceChange}
      />
      <MapAlerts
        error={locationError || mapState.error}
        isLocating={isLocating}
      />
      <MapControls onCenterMap={handleCenterMap} isLocating={isLocating} />
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
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-xl font-bold">Configuration Error</h1>
            <p className="py-6">Missing required configuration.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen relative">
      <APIProvider apiKey={apiKey} libraries={["places"]}>
        <Map
          mapId={mapId}
          defaultZoom={defZoom}
          defaultCenter={{ lat: defLat, lng: defLng }}
          gestureHandling="greedy"
          options={{
            disableDefaultUI: true,
            mapTypeControl: true,
            mapTypeControlOptions: {
              position: 3,
              style: 1,
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
