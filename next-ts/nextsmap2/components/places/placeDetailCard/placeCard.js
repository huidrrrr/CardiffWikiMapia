import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card } from "antd";
import React from "react";
import styles from "./placeCard.module.css";
import Image from "next/image";
const { Meta } = Card;

const PlaceCard = (props) => {
  const { placeData } = props;
  const imgSrc = "/images/" + placeData.img;
  if (!placeData) {
    return <p>Loading...</p>;
  } else {
    return (
      <Card
        style={{
          width: 300,
        }}
        cover={<img alt="example" src={imgSrc} />}

      >
        <h2 className={styles.title}>{placeData.name}</h2>
        <Meta
          avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
          title={placeData.name}
          description={"added by"}
        />
      </Card>
    );
  }
};

export default PlaceCard;
