import React from 'react'
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
export default function GMarker(props) {


  return (
    <Marker position={props.position}></Marker>
  )
}
