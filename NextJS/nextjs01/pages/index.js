import React from "react";
import EventList from "../components/events/eventList";
import { getFeaturedEvents } from "../helpers/apiUtil";
import Head from "next/head";

export default function HomePage(props) {
  return (
    <div>
      <Head>
        <title>Next Events</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve"
        />
      </Head>
      <EventList items={props.events} />
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800,
  };
}
