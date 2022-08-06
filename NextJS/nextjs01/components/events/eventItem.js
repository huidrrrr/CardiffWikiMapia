import React from "react";
import styles from "./eventItem.module.css";
import Button from "../ui/button";
import CalenderIcon from "../icons/calenderIcon";
import AddressIcon from "../icons/addressIcon";
import ArrowRightIcon from "../icons/arrowRightIcon";
import Image from 'next/image';
export default function EventItem(props) {
  const { title, image, date, location, id } = props;
  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedAddress = location.replace(", ", "\n");

  const exploreLink = `/events/${id}`;
  return (
    <li className={styles.item}>
      <Image src={"/" + image} alt={title} width={840} height={160} />
      
      <div className={styles.content}>
        <div className={styles.summary}>
          <h2>{title}</h2>
          <div className={styles.date}>
            <CalenderIcon />
            <time>{humanReadableDate}</time>
          </div>
          <div className={styles.address}>
            <AddressIcon />
            <address >{formattedAddress}</address>
          </div>
        </div>
        <div className={styles.actions}>
          <Button link={exploreLink}>
            <span>Explore Event</span>
            <span className={styles.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
}
