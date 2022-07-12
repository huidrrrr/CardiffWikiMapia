import Head from "next/head";
import Image from "next/image";
import GMap from "./GMap";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useMemo } from "react";
import GMarker from "./GMarker";
import Map from "./components/map";

export default function Home() {
  const position = useMemo(() => ({ lat: 51.4837, lng: -3.1681 }), []);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries:["places"]
  });
  if (!isLoaded) {
    return <div >Loading...</div>;
  }

  return (<div >
    <Map/>
  </div>
  );
}
