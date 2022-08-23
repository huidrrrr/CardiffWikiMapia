import React from "react";
import PlaceList from "../../components/places/placesListComp";
import { getAllPlaces } from "../../components/helper/apiUtil";
export default function PlaceListPage(props) {
  const { places } = props;
  return <PlaceList places={places}/>;
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
  