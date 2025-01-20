import { useEffect, useRef } from "react";
import { useMap } from "@vis.gl/react-google-maps";

export default function usePlaceAutocomplete(
  inputRef,
  enabled = true,
  onPlaceSelect
) {
  const map = useMap();
  const autocompleteRef = useRef(null);

  useEffect(() => {
    if (!window.google || !map || !inputRef.current || !enabled) return;

    const autocomplete = new window.google.maps.places.Autocomplete(
      inputRef.current,
      {
        fields: ["formatted_address", "geometry"],
        componentRestrictions: { country: "pl" },
      }
    );

    autocomplete.bindTo("bounds", map);
    autocompleteRef.current = autocomplete;

    const listener = autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      onPlaceSelect(place);
    });

    return () => {
      window.google.maps.event.removeListener(listener);
      autocomplete.unbindAll();
      autocompleteRef.current = null;
    };
  }, [map, enabled, onPlaceSelect, inputRef]);

  return autocompleteRef;
}
