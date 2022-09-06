import React from "react";
import {
  getOneUpperPlaces,
  getAllPlaces,
} from "../../components/helper/apiUtil";
export default function PlaceHistoryList() {
  return <div>placeHistoryList</div>;
}

export async function getStaticProps(context) {
  const { upperId } = context.params;
  const filteredPlaces = await getOneUpperPlaces(upperId);

  return {
    props: {
      places: filteredPlaces,
    },
    revalidate: 1800,
  };
}

export async function getStaticPaths() {
  const places = await getAllPlaces();
  const upperId = places.map((place) => ({
    params: { upperId: place.upperId.toString() },
  }));
  return {
    paths: upperId,
    fallback: true,
  };
}
