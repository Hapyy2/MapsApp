import { useCallback, useRef } from "react";
import { useMap } from "@vis.gl/react-google-maps";

export default function useRoute() {
  const map = useMap();
  const directionsRendererRef = useRef(null);

  const initializeRenderer = useCallback(() => {
    if (!window.google || !map) return;

    const renderer = new window.google.maps.DirectionsRenderer({
      map,
      suppressMarkers: false,
    });
    directionsRendererRef.current = renderer;

    return () => {
      renderer.setMap(null);
    };
  }, [map]);

  const calculateRoute = useCallback((origin, destination) => {
    return new Promise((resolve, reject) => {
      if (!origin || !destination) {
        reject(new Error("Origin and destination are required"));
        return;
      }

      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin,
          destination,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            directionsRendererRef.current?.setDirections(result);
            resolve({
              distance: result.routes[0].legs[0].distance.text,
              duration: result.routes[0].legs[0].duration.text,
            });
          } else {
            reject(new Error("Could not calculate route"));
          }
        }
      );
    });
  }, []);

  const clearRoute = useCallback(() => {
    if (directionsRendererRef.current) {
      directionsRendererRef.current.setDirections({ routes: [] });
    }
  }, []);

  return {
    initializeRenderer,
    calculateRoute,
    clearRoute,
  };
}
