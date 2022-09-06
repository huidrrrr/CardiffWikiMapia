import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React from "react";
import Places from "../map/places";
import styles from "./browsePlaceSideBar.module.css";
export default function BrowsePlaceSideBar(props) {
  const sendData = (position) => {
    props.setOffice(position);
  };

  const callDrawer = () => {
    props.callSonComp();
  };
  return (
    <div className={styles.inputPlace}>
      <div style={{ display: "flex", marginBottom: "1rem" }}>
        <h1 className={styles.h3Style}>Place</h1>
        {props.placeDataIsValid && (
          <Button
            style={{ justifyContent: "right", marginLeft: "auto" }}
            shape="circle"
            icon={<PlusOutlined />}
            onClick={callDrawer}
          />
        )}
      </div>
      <Places setOffice={sendData} />
    </div>
  );
}
