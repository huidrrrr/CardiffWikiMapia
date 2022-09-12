import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useLoadScript } from "@react-google-maps/api";
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
import BackTop from "../../components/pageLayout/backTop";
import { getUserById } from "../../components/helper/userApiUtil";
import { Collapse } from "antd";
const { Panel } = Collapse;
export default function PlaceDetailPage(props) {
  const {place} = props
  // const [place, setPlace] = useState(props.place);
  const [upperData, setUpperData] = useState({});

  const [ libraries ] = useState(['places']);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyD0EITvU6aSQn9zF8fSXHQ5Dd0MjF5Q7aI",
    libraries: libraries,
  });
  if (!isLoaded) return <div>Loading...</div>;
  if (!place) {
    return <p>Loading...</p>;
  }
  getUserById(place.upperId).then((res) => {
    setUpperData(res.data);
  });
  const placeDetailData = {
    id: place.id,
    name: place.name,
    img: place.img,
    upperName: upperData.username,
    upperAvatar: upperData.avatar,
    uploadDate: place.date,
  };
  const eventsList = [];
  for (const key in place.events) {
    eventsList.push({
      id: key,
      ...place.events[key],
    });
  }

  const eventsData = {
    upperName: upperData.username,
    upperAvatar: upperData.avatar,
    uploadDate: place.date,
    placeId: place.id,
    events: eventsList,
  };
  const commentsData = {
    upperName: upperData.username,
    upperAvatar: upperData.avatar,
    uploadDate: place.date,
    placeId: place.id,
    comments: place.comments,
  };

  const position = place.position;

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
      <BackTop />
    </div>
  );
}

export async function getStaticProps(context) {
  const placeId = context.params.placeId;
  const place = await getPlaceById(placeId);

  return {
    props: {
      place: place,
      userType: "user",
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
