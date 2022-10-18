import React from "react";
import styles from "./placeDetailCard.module.css";
import { Card, Image } from "antd";
import { useRouter } from "next/router";

export default function PlaceDetailCard(props) {
  const { placeDetail } = props;
  // check empty data----------------------------------------

  const router = useRouter();
  const cardClickhandler = (placeDetail) => {
    const path = {
      pathname: `/placeDetail/${placeDetail.id}`,
    };
    router.push(path);
  };

  return (
    <div>
      <Card
        style={{ minWidth: "20rem" }}
        hoverable
        title={placeDetail.name}
        extra={
          <div
            style={{ cursor: "pointer" }}
            onClick={() => cardClickhandler(placeDetail)}
          >
            #More
          </div>
        }
      >
        <div className={styles.imgBox}>
          <Image
            src={placeDetail.img ? placeDetail.img : "/images/noImg.png"}
            alt=""
            height={230}
          />
        </div>
        <div className={styles.verticalBox}>
          <p>Place Name:</p>
          <p style={{ fontWeight: "bold" }} className={styles.placeInfo}>
            {placeDetail.name}
          </p>
        </div>
        <div className={styles.verticalBox}>
          <p>Place Category:</p>
          <p className={styles.placeInfo}>{placeDetail.category}</p>
        </div>
        <div className={styles.horizontalBox}>
          <p>Place Description:</p>
          <p
            style={{
              wordBreak: "break-all",
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {placeDetail.description}
          </p>
        </div>
      </Card>
    </div>
  );
}
