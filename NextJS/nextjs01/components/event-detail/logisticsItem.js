import React from "react";
import styles from "./logisticsItem.module.css";
export default function LogisticsItem(props) {
  const { icon: Icon } = props;
  return (
    <li className={styles.item}>
      <span className={styles.icon}>
        <Icon />
      </span>
      <span className={styles.content}>{props.children}</span>
    </li>
  );
}
