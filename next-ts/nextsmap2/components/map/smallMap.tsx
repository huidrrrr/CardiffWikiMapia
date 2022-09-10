import { useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

type MapOptions = google.maps.MapOptions;
export default function SmallMap(props: any) {
  let { position } = props;

  const options = useMemo<MapOptions>(
    () => ({
      mapId: "7f4dd82f5e97eadb",
      disableDefaultUI: false,
      clickableIcons: false,
    }),
    []
  );

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyD0EITvU6aSQn9zF8fSXHQ5Dd0MjF5Q7aI",
    libraries: ["places"],
  });

  const containerStyle = {
    minWidth:'20rem',
    height: "28rem",
  };

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <div style={{flex:"4"}}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        zoom={18}
        center={position ? position : { lat: 51.4837, lng: -3.1681 }}
        mapContainerClassName="map-container"
        options={options}
      >
        {position && (
          <Marker
            position={position ? position : { lat: 51.4837, lng: -3.1681 }}
          />
        )}
      </GoogleMap>
    </div>
  );
}
