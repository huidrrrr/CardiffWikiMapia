import Head from "next/head";
import Image from "next/image";

import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useMemo } from "react";
import Map from "../components/map";




export default function Home() {
  const position = useMemo(() => ({ lat: 51.4837, lng: -3.1681 }), []);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyD0EITvU6aSQn9zF8fSXHQ5Dd0MjF5Q7aI",
    libraries: ["places"],
  });
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Map />
    </div>
  );
}
