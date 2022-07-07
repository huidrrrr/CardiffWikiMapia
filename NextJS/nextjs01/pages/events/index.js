import React, { Fragment } from "react";
import EventList from "../../components/events/eventList";
import { getAllEvents } from "../../dummy-data";
import EventsSearch from "../../components/events/eventsSearch";

export default function AllEventPage() {
  const events = getAllEvents();

  return (
    <Fragment>
      <EventsSearch />
      <EventList items={events} />
    </Fragment>
  );
}
