import React from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import styles from "./GMap.module.css";

export default function GMap(props) {
  return (
    <GoogleMap
      zoom={10}
      center={props.position}
      mapContainerClassName={styles.mapContainer}
    >
      {props.children}
    </GoogleMap>
  );
}
