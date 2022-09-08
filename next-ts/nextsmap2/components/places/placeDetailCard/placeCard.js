import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Image } from "antd";
import React from "react";
import styles from "./placeCard.module.css";

const { Meta } = Card;

const PlaceCard = (props) => {
  const { placeDetailData } = props;

  if (!placeDetailData) {
    return <p>Loading...</p>;
  } else {
    return (
      <Card
        style={{
          width: 300,
        }}
        cover={
          <Image
            alt="example"
            src={
              placeDetailData.img ? placeDetailData.img : "/images/noImg.png"
            }
          />
        }
      >
        <h2 className={styles.title}>{placeDetailData.name}</h2>
        <Meta
          avatar={<Avatar src={placeDetailData.upperAvatar} />}
          title={placeDetailData.upperName}
          description={"added by"}
        />
      </Card>
    );
  }
};

export default PlaceCard;
