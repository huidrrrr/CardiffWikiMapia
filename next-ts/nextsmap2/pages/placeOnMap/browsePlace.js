import React from "react";
import BrowseMap from "../../components/map/browseMap";
import { getAllPlaces } from "../../components/helper/apiUtil";

export default function BrowsePlace(props) {
  const { places } = props;
  return <BrowseMap places={places} />;
}

export async function getStaticProps() {
  const places = await getAllPlaces();

  return {
    props: {
      places: places,
    },
    revalidate: 1800,
  };
}
