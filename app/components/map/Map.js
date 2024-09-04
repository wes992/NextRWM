"use client";

import React from "react";
import { useGeocode } from "./utils";

import { CircleF, GoogleMap } from "@react-google-maps/api";

const Map = ({ location }) => {
  const { mapReady, lat, lng } = useGeocode(location);

  const mapCenter = { lat, lng };

  return !mapReady ? (
    <div> Loading Map..</div>
  ) : (
    <GoogleMap
      // options={mapOptions}
      zoom={14}
      center={mapCenter}
      // mapTypeId={google.maps.MapTypeId.ROADMAP}
      mapContainerStyle={{ width: "100%", height: "100%" }}
    >
      <CircleF
        center={mapCenter}
        radius={500}
        options={{
          fillColor: "red",
          strokeColor: "red",
          strokeOpacity: 0.8,
        }}
      />
    </GoogleMap>
  );
};

export { Map };
