import React, { useMemo } from "react";
import { useMap } from "@vis.gl/react-google-maps";
import placeService from "@/services/placeService";

export default function MyPlacesModal({ isOpen, onClose }) {
  const map = useMap();

  const userPlaces = useMemo(() => {
    return placeService.getUserPlaces();
  }, []);

  const handlePlaceClick = (place) => {
    map?.panTo({ lat: place.lat, lng: place.lng });
    map?.setZoom(17);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-base-100 rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">My Places</h3>
            <button onClick={onClose} className="btn btn-ghost btn-sm">
              ✕
            </button>
          </div>

          <div className="space-y-4 max-h-96 overflow-y-auto">
            {userPlaces.length === 0 ? (
              <p className="text-center text-gray-500">
                You havent added any places yet
              </p>
            ) : (
              userPlaces.map((place) => (
                <div
                  key={place.id}
                  onClick={() => handlePlaceClick(place)}
                  className="p-4 bg-base-200 rounded-lg cursor-pointer hover:bg-base-300 transition-colors"
                >
                  <h4 className="font-medium">{place.name}</h4>
                  <p className="text-sm text-gray-500 mt-1">
                    {place.description}
                  </p>
                  <div className="flex items-center gap-2 mt-2 text-xs">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: place.pinColor.background }}
                    />
                    <span>{place.isPublic ? "Public" : "Private"}</span>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="mt-6">
            <button onClick={onClose} className="btn btn-block">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
