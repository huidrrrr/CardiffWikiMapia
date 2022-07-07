import React from "react";
import AddressIcon from "../icons/addressIcon";
import styles from "./eventLogistics.module.css";
import LogisticsItem from "./logisticsItem";

export default function EventLogistics(props) {
  const { date, address, image, imageAlt } = props;

  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <section className={styles.logistics}>
      <div className={styles.image}>
        <img src={`/${image}`} alt={imageAlt} />
      </div>
      <ul className={styles.list}>
        <LogisticsItem icon={DateIcon}>
          <time>{humanReadableDate}</time>
        </LogisticsItem>
        <LogisticsItem icon={AddressIcon}>
            <address>{address}</address>
        </LogisticsItem>
      </ul>
    </section>
  );
}
