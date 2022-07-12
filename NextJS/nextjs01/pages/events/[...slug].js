import React, { Fragment } from "react";
import { useRouter } from "next/router";
import { getFilteredEvents } from "../../helpers/apiUtil";
import EventList from "../../components/events/eventList";
import ResultsTitle from "../../components/events/resultsTitle";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/errorAlert";

export default function FilteredEventsPage(props) {
  const router = useRouter();
  // const filterData = props.events

  // if (!filterData) {
  //   return <p className="center">Loading...</p>;
  // }
  // const filterEdYear = filterData[0];
  // const filterEdMonth = filterData[1];

  // const numYear = +filterEdYear;
  // const numMonth = +filterEdMonth;

  if (props.hasError) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">show all events</Button>
        </div>
      </Fragment>
    );
  }
  const filteredEvents = props.events

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">show all events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(props.date.year, props.date.month - 1);

  return (
    <div>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const filterData = params.slug;
  const filterEdYear = filterData[0];
  const filterEdMonth = filterData[1];

  const numYear = +filterEdYear;
  const numMonth = +filterEdMonth;

  if (isNaN(numYear) || isNaN(numMonth) || numMonth < 1 || numMonth > 12) {
    return {
      props: {
        hasError: true,
      },
    };
  }
  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  return {
    props: {
      events: filteredEvents,
      date: {
        year: numYear,
        month: numMonth,
      },
    },
  };
}
