import React, { Fragment } from "react";
import EventList from "../../components/events/eventList";
import { getAllEvents } from "../../helpers/apiUtil";
import EventsSearch from "../../components/events/eventsSearch";
import { useRouter } from "next/router";

export default function AllEventPage(props) {
  const { events } = props;
  const router = useRouter();

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

export async function getStaticProps() {
  const events = await getAllEvents();
  return {
    props: {
      events: events,
    },
    revalidate: 60,
  };
}
