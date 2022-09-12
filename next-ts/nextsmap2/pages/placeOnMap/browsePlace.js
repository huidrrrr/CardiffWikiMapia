import React, { useEffect, useState } from "react";
import Map from "../../components/map/map";
import { GetAllPlaces } from "../../components/helper/placeApiUtil";
import { getAllPlaces } from "../../components/helper/apiUtil";
import { useLoadScript } from "@react-google-maps/api";

export default function BrowsePlace(props) {
  const { places } = props;

  const [ libraries ] = useState(['places']);


  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyD0EITvU6aSQn9zF8fSXHQ5Dd0MjF5Q7aI",
    libraries: libraries,
  });

  if (!isLoaded) return <div>Loading...</div>;
  // response.then((res) => {
  //   setPlaceData(res);
  // });
  // if (!placeData) {
  //   return <p>Loading map...</p>;
  // }

  return <Map places={places} />;
}

export async function getStaticProps() {
  const places = await getAllPlaces();
  return {
    props: {
      places:places,
      userType: "user",
    },
  };
}
