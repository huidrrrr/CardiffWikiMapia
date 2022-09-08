import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import SmallMap from "../../components/map/smallMap";
import {
  getAllPlaces,
  getOnePlaceEventsByPlaceId,
  getPlaceById,
} from "../../components/helper/apiUtil";
import PlaceCard from "../../components/places/placeDetailCard/placeCard";
import styles from "./index.module.css";
import Comment from "../../components/places/comments/addComment";
import Timeline from "../../components/places/timeline/timeline";
import { Collapse } from "antd";
const { Panel } = Collapse;
export default function PlaceDetailPage(props) {
  const { place } = props;
  const [placeData, setPlaceData] = useState(place);
  const { events } = place;


  useEffect(() => {
    setPlaceData(place);
  }, [place]);
  if (!place) {
    return <p>Loading...</p>;
  }
  const placeDetailData = {
    id: placeData.id,
    name: placeData.name,
    img: placeData.img,
    upperName: "Peter",
    upperAvatar: "https://joeschmoe.io/api/v1/random",
    uploadDate: "2022-07-29",
  };
  const eventsList=[]
  for(const key in placeData.events){
    eventsList.push({
      id:key,
      ...placeData.events[key]
    })
  }

  const eventsData = {
    placeId: placeData.id,
    events: eventsList,
  };
  const commentsData = {
    placeId: placeData.id,
    comments: placeData.comments,
  };

  const position = placeData.position;

  return (
    <div className={styles.content}>
      <div className={styles.detailBox}>
        <PlaceCard placeDetailData={placeDetailData} />
        <SmallMap position={position} />
      </div>
      <div>
        <Collapse bordered={false} defaultActiveKey={["1"]}>
          <Panel header="Place detail" key="1">
            <div></div>
          </Panel>
          <Panel header="Timeline" key="2">
            <Timeline eventsData={eventsData} />
          </Panel>
          <Panel header="Comments" key="3">
            <Comment commentsData={commentsData} />
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
    fallback: false,
  };
}
