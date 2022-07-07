import React from "react";
import Button from "../ui/button";
import styles from "./resultsTitle.module.css";

export default function ResultsTitle(props) {
  const { date } = props;

  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <section className={styles.title}>
      <h1>Events in {humanReadableDate}</h1>
      <Button link="/events">show all events</Button>
    </section>
  );
}
