import React, { FC } from "react";
import { Button } from "antd";
import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function Home() {
  return(
  <div>
    <Link href="/map">To map</Link>
  </div>)
}
