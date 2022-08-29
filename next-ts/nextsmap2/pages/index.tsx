import React from "react";
import Test from "../components/test";
import { GetAllPlaces } from "../components/helper/placeApiUtil";
import BrowseMap from "../components/map/browseMap";
import axios from "axios";
export default function Home(props: any) {
  const { places } = props;

  return (
    <div>
      <Test />
    </div>
  );
}

export async function getStaticProps() {
  const placesData = await GetAllPlaces();

  return {
    props: {
      places: placesData,
    },
    revalidate: 1800,
  };
}
