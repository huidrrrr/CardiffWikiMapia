import React, { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getFilteredEvents } from "../../helpers/apiUtil";
import EventList from "../../components/events/eventList";
import ResultsTitle from "../../components/events/resultsTitle";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/errorAlert";
import useSWR from "swr";
import axios from "axios";
import Head from "next/head";

export default function FilteredEventsPage(props) {
  const router = useRouter();
  const [loadedEvents, setLoadedEvents] = useState();

  const filterData = router.query.slug;

  const { data, error } = useSWR(
    "https://nextjs-dummydb-61545-default-rtdb.firebaseio.com/events.json",
    axios
  );

  useEffect(() => {
    if (data) {
      const events = [];
      for (const key in data.data) {
        events.push({
          id: key,
          ...data.data[key],
        });
      }

      setLoadedEvents(events);
    }
  }, [data]);

  

  let pageHeadData = (<Head>
    <title>Filtered Events</title>
    <meta
      name="description"
      content='a list of filtered events'
    />
  </Head>)

  if (!loadedEvents) {
    return (
      <Fragment>
        {pageHeadData}
        <p className="center">Loading...</p>;
      </Fragment>
    );
  }

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta
        name="description"
        content={`All events for ${numMonth}/${numYear}.`}
      />
    </Head>
  );


  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numMonth < 1 ||
    numMonth > 12 ||
    error
  ) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">show all events</Button>
        </div>
      </Fragment>
    );
  }

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });
  console.log(filteredEvents);
  console.log(loadedEvents);

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">show all events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <Fragment>
      <Head>
        <title>Filtered Events</title>
        <meta
          name="description"
          content={`All events for ${numMonth}/${numYear}.`}
        />
      </Head>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
}

// export async function getServerSideProps(context) {
//   const { params } = context;
//   const filterData = params.slug;
//   const filterEdYear = filterData[0];
//   const filterEdMonth = filterData[1];

//   const numYear = +filterEdYear;
//   const numMonth = +filterEdMonth;

//   if (isNaN(numYear) || isNaN(numMonth) || numMonth < 1 || numMonth > 12) {
//     return {
//       props: {
//         hasError: true,
//       },
//     };
//   }
//   const filteredEvents = await getFilteredEvents({
//     year: numYear,
//     month: numMonth,
//   });

//   return {
//     props: {
//       events: filteredEvents,
//       date: {
//         year: numYear,
//         month: numMonth,
//       },
//     },
//   };
// }
