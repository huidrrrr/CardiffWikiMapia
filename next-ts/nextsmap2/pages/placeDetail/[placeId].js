import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import SmallMap from "../../components/map/smallMap";
import { getAllPlaces, getPlaceById } from "../../components/helper/apiUtil";
import PlaceCard from "../../components/places/placeDetailCard/placeCard";
import CommentBox from "../../components/places/comments/comment";
import styles from "./index.module.css";
import AddComment from "../../components/places/comments/addComment";
import TimelineComp from "../../components/places/timeline/timeline";
import { Chrono } from "react-chrono";
import { Collapse } from "antd";
const { Panel } = Collapse;
export default function PlaceDetailPage(props) {
  const { place } = props;
  const [placeData, setPlaceData] = useState(place);
  const { events } = place;
  const eventsList = [];
  for (const key in events) {
    eventsList.push({
      ...events[key],
    });
  }

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
      <div>
        <Collapse bordered={false} defaultActiveKey={["1"]}>
          <Panel header="Timeline" key="1">
            <Chrono items={eventsList} mode="VERTICAL" />
          </Panel>
          <Panel header="Comments" key="2">
            <AddComment placeData={placeData} />
          </Panel>
        </Collapse>
      </div>
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
