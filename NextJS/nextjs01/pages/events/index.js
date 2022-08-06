import React, { Fragment } from "react";
import EventList from "../../components/events/eventList";
import { getAllEvents } from "../../helpers/apiUtil";
import EventsSearch from "../../components/events/eventsSearch";
import Head from "next/head";
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
      <Head>
        <title>All Events</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve"
        />
      </Head>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const events = await getAllEvents();
  console.log("events data is :");
  console.log(events);
  return {
    props: {
      events: events,
    },
    revalidate: 60,
  };
}
