import React from "react";
import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { useLoadScript } from "@react-google-maps/api";
import { GoogleMap, Marker } from "@react-google-maps/api";
export default function AddMissingPlace() {
  const mapRef = useRef();
  const [click, setClick] = useState();
  const onLoad = useCallback((map) => (mapRef.current = map), []);
  //   map center-----------------------------------------
  const center = useMemo(() => ({ lat: 51.4837, lng: -3.1681 }), []);

  //   map option----------------------------------
  const options = useMemo(
    () => ({
      mapId: "7f4dd82f5e97eadb",
      disableDefaultUI: false,
      clickableIcons: false,
    }),
    []
  );
  //  map click eventHandler--------------------------------------

  const onClick = (e) => {
    setClick(e.latLng);
  };

  const containerStyle = {
    width: " 60rem",
    height: "35rem",
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyD0EITvU6aSQn9zF8fSXHQ5Dd0MjF5Q7aI",
    libraries: ["places"],
  });

  if (!isLoaded) {
    return <p>Loading...</p>;
  }
  return (
    <div className="mapContainer">
      <GoogleMap
        mapContainerStyle={containerStyle}
        zoom={10}
        center={center}
        mapContainerClassName="map-container"
        options={options}
        onLoad={onLoad}
        onClick={onClick}
      >
        {click && <Marker position={click} />}
      </GoogleMap>
    </div>
  );
}
