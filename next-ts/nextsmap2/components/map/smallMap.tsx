import { useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

type MapOptions = google.maps.MapOptions;
export default function SmallMap(props: any) {
  const { placeData } = props;
  let position = { lat: 51.4837, lng: -3.1681 };
  if (placeData) {
    position = placeData.position;
  }

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
    width: " 45rem",
    height: "28rem",
  };

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        zoom={18}
        center={position}
        mapContainerClassName="map-container"
        options={options}
      >
        <Marker position={position} />
      </GoogleMap>
    </div>
  );
}
