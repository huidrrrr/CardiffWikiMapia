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
  
  if (!placeData) {
    return <p>Loading...</p>;
  } else {
    return (
      <Card
        style={{
          width: 300,
        }}
        cover={<img alt="example" src={placeData.img ? "/images/" + placeData.img : "/images/noImg.png"} />}

      >
        <h2 className={styles.title}>{placeData.name}</h2>
        <Meta
          avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
          title={`upper name`}
          description={"added by"}
        />
      </Card>
    );
  }
};

export default PlaceCard;
