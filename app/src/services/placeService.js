"use client";
import authService from "./authService";

class PlaceService {
  constructor() {
    this.initializePlaces();
  }

  initializePlaces() {
    if (typeof window === "undefined") {
      this.places = [];
      return;
    }

    const currentUser = authService.getCurrentUser()?.user;
    if (!currentUser) {
      this.places = [];
      return;
    }

    // Get all places from localStorage
    const allPlaces = [];
    const keys = Object.keys(localStorage);
    const placeKeys = keys.filter((key) => key.startsWith("places_"));

    // Collect all places
    placeKeys.forEach((key) => {
      const places = JSON.parse(localStorage.getItem(key) || "[]");
      allPlaces.push(...places);
    });

    // Filter places: include user's own places and public places from others
    this.places = allPlaces.filter(
      (place) => place.userId === currentUser.id || place.isPublic
    );
  }

  getAllPlaces() {
    const currentUser = authService.getCurrentUser()?.user;
    if (!currentUser) return [];

    this.initializePlaces();
    return this.places;
  }

  getUserPlaces() {
    const currentUser = authService.getCurrentUser()?.user;
    if (!currentUser) return [];

    const userPlacesKey = `places_${currentUser.id}`;
    return JSON.parse(localStorage.getItem(userPlacesKey) || "[]");
  }

  addPlace(place) {
    const currentUser = authService.getCurrentUser()?.user;
    if (!currentUser) {
      throw new Error("User must be logged in to add places");
    }

    const newPlace = {
      id: Date.now().toString(),
      userId: currentUser.id,
      isPublic: place.isPublic || false,
      createdBy: {
        id: currentUser.id,
        name: `${currentUser.firstName} ${currentUser.lastName}`,
      },
      ...place,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const userPlaces = this.getUserPlaces();
    userPlaces.push(newPlace);
    this._savePlaces(userPlaces);

    return newPlace;
  }

  updatePlace(id, updates) {
    const currentUser = authService.getCurrentUser()?.user;
    if (!currentUser) {
      throw new Error("User must be logged in to update places");
    }

    const userPlaces = this.getUserPlaces();
    const index = userPlaces.findIndex(
      (place) => place.id === id && place.userId === currentUser.id
    );

    if (index === -1) {
      throw new Error("Place not found or unauthorized");
    }

    const updatedPlace = {
      ...userPlaces[index],
      ...updates,
      userId: currentUser.id, // Ensure userId cannot be changed
      updatedAt: new Date().toISOString(),
    };

    userPlaces[index] = updatedPlace;
    this._savePlaces(userPlaces);
    return updatedPlace;
  }

  deletePlace(id) {
    const currentUser = authService.getCurrentUser()?.user;
    if (!currentUser) {
      throw new Error("User must be logged in to delete places");
    }

    const userPlaces = this.getUserPlaces();
    const index = userPlaces.findIndex(
      (place) => place.id === id && place.userId === currentUser.id
    );

    if (index === -1) {
      throw new Error("Place not found or unauthorized");
    }

    userPlaces.splice(index, 1);
    this._savePlaces(userPlaces);
  }

  getPlace(id) {
    const currentUser = authService.getCurrentUser()?.user;
    if (!currentUser) {
      throw new Error("User must be logged in to access places");
    }

    const place = this.places.find((place) => place.id === id);

    if (!place) {
      throw new Error("Place not found");
    }

    // Return full place data if user is the owner
    if (place.userId === currentUser.id) {
      return place;
    }

    // Return limited data if place is public but user is not the owner
    if (place.isPublic) {
      return {
        id: place.id,
        name: place.name,
        description: place.description,
        lat: place.lat,
        lng: place.lng,
        isPublic: true,
        createdBy: place.createdBy,
        userId: place.userId,
      };
    }

    throw new Error("Unauthorized to view this place");
  }

  _savePlaces(places) {
    if (typeof window === "undefined") return;

    const currentUser = authService.getCurrentUser()?.user;
    if (!currentUser) return;

    const userPlacesKey = `places_${currentUser.id}`;
    localStorage.setItem(userPlacesKey, JSON.stringify(places));

    this.initializePlaces();
  }

  clearPlaces() {
    this.places = [];
  }
}

if (typeof window !== "undefined") {
  const originalLogout = authService.logout;
  authService.logout = function () {
    placeService.clearPlaces();
    originalLogout.call(this);
  };
}

const placeService = new PlaceService();
export default placeService;
