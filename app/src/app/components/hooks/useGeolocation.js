import { useState } from "react";

export default function useGeolocation() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [isLocating, setIsLocating] = useState(false);

  const updateLocation = () => {
    return new Promise((resolve, reject) => {
      setIsLocating(true);
      setError(null);

      if (!navigator.geolocation) {
        const error =
          "Geolokalizacja nie jest wspierana przez Twoją przeglądarkę";
        setError(error);
        setIsLocating(false);
        reject(error);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setLocation(newLocation);
          setIsLocating(false);
          resolve(newLocation);
        },
        (err) => {
          let errorMessage = "Nie udało się pobrać lokalizacji";
          if (err.code === 1) {
            errorMessage =
              "Dostęp do lokalizacji zabroniony. Włącz lokalizację w przeglądarce.";
          } else if (err.code === 2) {
            errorMessage = "Lokalizacja niedostępna. Spróbuj ponownie.";
          } else if (err.code === 3) {
            errorMessage = "Upłynął limit czasu. Spróbuj ponownie.";
          }
          setError(errorMessage);
          setIsLocating(false);
          reject(errorMessage);
        },
        {
          enableHighAccuracy: true,
          timeout: 30000,
          maximumAge: 0,
        }
      );
    });
  };

  return {
    location,
    error,
    isLocating,
    updateLocation,
  };
}
