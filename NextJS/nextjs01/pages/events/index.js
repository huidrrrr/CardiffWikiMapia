import React, { Fragment } from "react";
import EventList from "../../components/events/eventList";
import { getAllEvents } from "../../dummy-data";
import EventsSearch from "../../components/events/eventsSearch";
import { useRouter } from "next/router";

export default function AllEventPage() {
  const router = useRouter();
  const events = getAllEvents();

  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  }

  return (
    <Fragment>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  );
}
