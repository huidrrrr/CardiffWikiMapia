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
import { Collapse, DatePicker, Radio } from "antd";
import PlaceDetailInfo from "../../components/places/placeDetailForm";
import SelectPanel from "../../components/events/selectPanel";
import DateSelector from "../../components/events/dateSelector";
import moment from "moment";
const { RangePicker } = DatePicker;
const { Panel } = Collapse;
export default function PlaceDetailPage(props) {
  const { place } = props;
  // const [place, setPlace] = useState(props.place);
  const [upperData, setUpperData] = useState({});

  // date filter state----------------------------------
  const [filterMode, setFilterMode] = useState("descent");
  const [reverseState, setReverseState] = useState(true);
  const [libraries] = useState(["places"]);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyD0EITvU6aSQn9zF8fSXHQ5Dd0MjF5Q7aI",
    libraries: libraries,
  });


  const placeData = {
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
  let eventsToSort = JSON.parse(JSON.stringify(eventsList));
  eventsToSort.forEach((event) => {
    event.date = new Date(event.date);
  });
  const allSortEvents = eventsToSort.sort((a, b) => a.date - b.date);
  const [eventsInRange, setEventsInRange] = useState(allSortEvents);
  const [events, setEvents] = useState(eventsInRange);

  const placeDetailData = {
    id: place.id,
    name: place.name,
    img: place.img,
    description: place.description,
    category: place.category,
    upperName: upperData.username,
    uploadDate: place.date,
  };

  const eventsData = {
    upperName: upperData.username,
    upperAvatar: upperData.avatar,
    uploadDate: place.date,
    placeId: place.id,
  };
  const commentsData = {
    upperName: upperData.username,
    upperAvatar: upperData.avatar,
    uploadDate: place.date,
    placeId: place.id,
    comments: place.comments,
  };

  const eventYearLst = eventsList.map((event) =>
    new Date(moment().format(event.date)).getFullYear()
  );
  const yearlst = unique(eventYearLst);

  const eventMonthLst = eventsList.map(
    (event) => new Date(moment().format(event.date)).getMonth() + 1
  );
  const monthlst = unique(eventMonthLst);
  function unique(arr) {
    return Array.from(new Set(arr));
  }

  const datelst = {
    yearlst: yearlst,
    monthlst: monthlst,
  };

  const position = place.position;
  const rangeOnChange = (dates, dateStrings) => {
    if (dates) {
      const sortedEvents = events.filter(
        (event) =>
          dates[0].diff(moment(event.date), "days") <= 0 &&
          dates[1].diff(moment(event.date), "days") > 0
      );
      setEventsInRange(sortedEvents);
      
    } else {
      setEventsInRange(allSortEvents);
    }
  };
  const radioOnChange = (e) => {
    if (e.target.value === "all") {
      setEvents(eventsInRange);
    } else if (e.target.value === "past") {
      const sortedEvents = eventsInRange.filter(
        (event) => moment(event.date).diff(moment().format(), "days") < 0
      );
      setEvents(sortedEvents);
    } else if (e.target.value === "future") {
      const sortedEvents = eventsInRange.filter(
        (event) => moment(event.date).diff(moment().format(), "days") > 0
      );
      setEvents(sortedEvents);
    } else if (e.target.value === "present") {
      const sortedEvents = eventsInRange.filter(
        (event) => moment(event.date).diff(moment().format(), "days") === 0
      );
      setEvents(sortedEvents);
    }
  };
  useEffect(() => {
    setEvents(eventsInRange);
  }, [eventsInRange]);

  useEffect(() => {
    getUserById(place.upperId).then((res) => {
      setUpperData(res.data);
    });
  }, []);
  if (!place) return <div>Loading...</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className={styles.content}>
      <div className={styles.detailBox}>
        <PlaceCard placeDetailData={placeData} />
        <SmallMap position={position} />
      </div>
      <div>
        <Collapse bordered={false} defaultActiveKey={["1"]}>
          <Panel header="Place detail" key="1">
            <PlaceDetailInfo
              placeDetailData={placeDetailData}
            ></PlaceDetailInfo>
          </Panel>
          <Panel header="Timeline" key="2">
            <div>
              <p>Filter :</p>
              <RangePicker onChange={rangeOnChange} />
              <Radio.Group
                defaultValue="all"
                style={{ marginLeft: "1rem" }}
                onChange={radioOnChange}
              >
                <Radio.Button defaultChecked={true} value="all">
                  All
                </Radio.Button>
                <Radio.Button value="past">Past</Radio.Button>
                <Radio.Button value="present">Present</Radio.Button>
                <Radio.Button value="future">Future</Radio.Button>
              </Radio.Group>
            </div>

            <Timeline eventsData={eventsData} events={events} isReverse={reverseState} />
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
