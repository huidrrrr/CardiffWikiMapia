import React from "react";
import PlaceList from "../../components/places/placesListComp";
import { getAllPlaces } from "../../components/helper/apiUtil";
import SearchInput from "../../components/places/searchInput/searchInput";
export default function PlaceListPage(props) {
  const { places } = props;
  return (
    <div>
      <SearchInput/>
      <PlaceList places={places} />
    </div>
  );
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
