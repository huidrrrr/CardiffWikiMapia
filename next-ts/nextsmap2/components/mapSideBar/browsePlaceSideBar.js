import { Button, Tooltip } from "antd";
import { PlusOutlined, AimOutlined } from "@ant-design/icons";
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
  const reloacte = () => {
    props.resetLoaction();
  };
  return (
    <div className={styles.inputPlace}>
      <div style={{ display: "flex", marginBottom: "1rem", gap: "1rem" }}>
        <h1 className={styles.h3Style}>Place</h1>
        {props.placeDataIsValid && (
          <Tooltip title="Add a missing place">
            <Button
              style={{ marginLeft: "10rem" }}
              shape="circle"
              icon={<PlusOutlined />}
              onClick={callDrawer}
            />
          </Tooltip>
        )}
        <Tooltip title="Current loaction">
          <Button
            style={{ justifyContent: "right", marginLeft: "auto" }}
            shape="circle"
            icon={<AimOutlined />}
            onClick={reloacte}
          />
        </Tooltip>
      </div>
      <Places setOffice={sendData} />
    </div>
  );
}
