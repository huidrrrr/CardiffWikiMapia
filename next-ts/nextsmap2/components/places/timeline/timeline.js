import { SmileOutlined } from "@ant-design/icons";
import { Timeline } from "antd";
import React from "react";
import EventCard from "../../events/eventCard";

const App = (props) => {
  const { eventsData } = props;
  const { placeId, events } = eventsData;
  if (!events) {
    return <div>No events yet</div>;
  }
  events.map((event) => {
    console.log(event);
  });

  return (
    <div>
      <Timeline mode="alternate">
        {events.map((event) => 
          <Timeline.Item key={event.id}>
            <EventCard event={event} />
          </Timeline.Item>
        )}
      </Timeline>
    </div>
  );
};

export default App;
