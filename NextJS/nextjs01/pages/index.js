import React from "react";
import EventList from "../components/events/eventList";
import {getFeaturedEvents, getAllEvents} from "../dummy-data";
export default function HomePage() {
  const featuredEvents = getFeaturedEvents();

  return (
    <div>
      <EventList items={featuredEvents}/>
    </div>
  );
}
