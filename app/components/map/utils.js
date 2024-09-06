"use client";

import { useEffect, useMemo, useState } from "react";
import { useJsApiLoader } from "@react-google-maps/api";

const locationCache = {};

function camelize(value) {
  return value.toUpperCase();
}

function cacheLocation(location, coordinates) {
  locationCache[camelize(location)] = coordinates;
}
function isLocationCached(location) {
  return locationCache[camelize(location)];
}

export const useMapLibs = (libs) => {
  const libraries = useMemo(() => libs, []);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY,
    libraries,
  });

  return { mapReady: isLoaded };
};

export const fetchGeocode = async (geocoder, address) => {
  const { results } = await geocoder.geocode({ address });

  if (results) {
    const result = results[0];
    const location = result.geometry.location;
    const lat = location.lat();
    const lng = location.lng();

    return { result, lat, lng };
  }
};

export const useGeocode = (address) => {
  const [geocodedLocation, setGeocodedLocation] = useState({ lat: 0, lng: 0 });
  const { mapReady } = useMapLibs(["geocoding"]);

  useEffect(() => {
    if (mapReady) {
      const geocoder = new window.google.maps.Geocoder();

      fetchGeocode(geocoder, address).then((result) =>
        setGeocodedLocation(result)
      );
    }
  }, [mapReady, address]);

  const { lat, lng, ...location } = geocodedLocation;

  return { mapReady, lat, lng, location };
};
