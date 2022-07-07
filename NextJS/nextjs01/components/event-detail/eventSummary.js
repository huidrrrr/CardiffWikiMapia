import React from "react";
import styles from "./eventSummary.module.css";
export default function EventSummary(props) {
  const { title } = props;
  return (
    <section className={styles.summary}>
      <div>
        <h1>{title}</h1>
      </div>
    </section>
  );
}
