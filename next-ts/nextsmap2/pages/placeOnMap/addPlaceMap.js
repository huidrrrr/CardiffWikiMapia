import React from "react";
import { getAllPlaces } from "../../components/helper/apiUtil";
import { ReactSession } from "react-client-session";
import AddMissingPlace from "../../components/places/addMissingPlace/addMissingPlace";
export default function AddPlace(props) {
  const { places } = props;
  const usernameIsValid = ReactSession.get("username");

  if (usernameIsValid) {
    return (
      <div>
        <AddMissingPlace />
      </div>
    );
  } else {
    return <p>please log in first</p>;
  }
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
