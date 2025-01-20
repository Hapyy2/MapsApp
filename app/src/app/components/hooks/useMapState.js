import { useState, useCallback } from "react";

export default function useMapState() {
  const [state, setState] = useState({
    modalOpen: false,
    selectedPlace: null,
    selectedLocation: null,
    places: [],
  });

  const updateMapState = useCallback((updates) => {
    setState((current) => ({ ...current, ...updates }));
  }, []);

  return [state, updateMapState];
}
