import { SmileOutlined } from "@ant-design/icons";
import { Timeline } from "antd";
import React from "react";
import EventCard from "../../events/eventCard";

const App = (props) => {
  const { eventsData } = props;
  const { placeId, events } = eventsData;
  const currentTime = new Date();
  if (!events) {
    return <div>No events yet</div>;
  }
  events.forEach((event) => {
    event.date = new Date(event.date);
  });

  const sortedEvents = events.sort((a, b) => b.date - a.date);
  console.log(sortedEvents);

  return (
    <div>
      <Timeline mode="alternate">
        {sortedEvents.map((event) => (
          <Timeline.Item
            key={event.id}
            label={event.date.toDateString()}
            color={
              event.date.getDate() === currentTime.getDate()
                ? "green"
                : event.date.getDate() > currentTime.getDate()
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
