import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import SmallMap from "../../components/map/smallMap";
import { getAllPlaces, getPlaceById } from "../../components/helper/apiUtil";
import PlaceCard from "../../components/places/placeDetailCard/placeCard";
import CommentBox from "../../components/comments/comment";
import styles from "./index.module.css";
import AddComment from "../../components/comments/addComment";
export default function PlaceDetailPage(props) {
  const { place } = props;
  const [placeData, setPlaceData] = useState(place);

  useEffect(() => {
    setPlaceData(place);
  }, [place]);
  if (!place) {
    return <p>Loading...</p>;
  }
  return (
    <div className={styles.content}>
      <div className={styles.detailBox}>
        <PlaceCard placeData={placeData} />
        <SmallMap placeData={placeData} />
      </div>
      <CommentBox placeData={placeData} />
      <AddComment />
    </div>
  );
}

export async function getStaticProps(context) {
  const placeId = context.params.placeId;
  const place = await getPlaceById(placeId);

  return {
    props: {
      place: place,
    },
    revalidate: 1800,
  };
}

export async function getStaticPaths() {
  const places = await getAllPlaces();

  const paths = places.map((place) => ({ params: { placeId: place.id } }));
  return {
    paths: paths,
    fallback: true,
  };
}
