import React from "react";
import AddressIcon from "../icons/addressIcon";
import CalenderIcon from "../icons/calenderIcon";
import styles from "./eventLogistics.module.css";
import LogisticsItem from "./logisticsItem";

export default function EventLogistics(props) {
  const { date, location, image, imageAlt } = props;
  const formattedAddress = location.replace(", ", "\n");
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
        <LogisticsItem icon={CalenderIcon}>
          <time>{humanReadableDate}</time>
        </LogisticsItem>
        <LogisticsItem icon={AddressIcon}>
          <address>{formattedAddress}</address>
        </LogisticsItem>
      </ul>
    </section>
  );
}
