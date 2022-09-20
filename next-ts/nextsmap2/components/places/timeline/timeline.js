import { SmileOutlined } from "@ant-design/icons";
import { Timeline } from "antd";
import React, { useEffect, useState } from "react";
import EventCard from "../../events/eventCard";
import AddEventCard from "../../events/addEventCard";
import moment from "moment";
const App = (props) => {
  const { eventsData, events } = props;
  const { placeId } = eventsData;
  const [eventsLst, setEventLst] = useState(events);

  const currentTime = moment().format();
  useEffect(() => {
    setEventLst(events);
  }, [events]);
  if (!events) {
    return <div>No events yet</div>;
  }
  const updateEventLst = (events) => {
    setEventLst(events);
  };

  return (
    <div>
      <Timeline
        mode="alternate"
        pending={
          <AddEventCard placeId={placeId} updateEventLst={updateEventLst} />
        }
        reverse={true}
      >
        {eventsLst.map((event) => (
          <Timeline.Item
            key={event.id}
            label={moment(event.date).format("MMMM Do YYYY")}
            color={
              moment(event.date).diff(currentTime, "days") === 0
                ? "green"
                : moment(event.date).diff(currentTime, "days") > 0
                ? "blue"
                : "gray"
            }
          >
            <EventCard event={event} placeId={placeId} />
          </Timeline.Item>
        ))}
      </Timeline>
    </div>
  );
};

export default App;
