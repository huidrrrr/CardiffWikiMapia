import { SmileOutlined } from "@ant-design/icons";
import { Timeline } from "antd";
import React from "react";
import EventCard from "../../events/eventCard";
import AddEventCard from '../../events/addEventCard'

const App = (props) => {
  const { eventsData } = props;
  const { placeId, events } = eventsData;
  const currentTime = new Date();
  if (!events) {
    return <div>No events yet</div>;
  }


  return (
    <div>
      
      <Timeline mode="alternate" pending={<AddEventCard placeId={placeId} />} reverse={true}>
        {events.map((event) => (
          <Timeline.Item
            key={event.id}
            label={event.date.toDateString()}
            color={
              event.date.getTime() === currentTime.getTime()
                ? "green"
                : event.date.getTime() > currentTime.getTime()
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
