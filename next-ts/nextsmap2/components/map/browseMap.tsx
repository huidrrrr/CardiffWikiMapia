import { useLoadScript } from "@react-google-maps/api";
import Map from "./map";

export default function MapPage(props: any) {
  const { places } = props;

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyD0EITvU6aSQn9zF8fSXHQ5Dd0MjF5Q7aI",
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map places={places}/>;
}
