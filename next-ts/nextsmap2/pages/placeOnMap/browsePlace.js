import React, { useEffect, useState } from "react";
import BrowseMap from "../../components/map/browseMap";
import { GetAllPlaces } from "../../components/helper/placeApiUtil";
import { getAllPlaces } from "../../components/helper/apiUtil";

export default function BrowsePlace(props) {
  // const { places } = props;
  const [placeData, setPlaceData] = useState();
  const response = getAllPlaces();
  response.then((res) => {
    setPlaceData(res);
  });
  if (!placeData) {
    return <p>Loading map...</p>
  }
  return <BrowseMap places={placeData} />;
}

// export async function getStaticProps() {
//   const places = await getAllPlaces();

//   return {
//     props: {
//       places: places,
//     },
//     revalidate: 1800,
//   };
// }
