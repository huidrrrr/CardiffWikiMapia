import React from "react";
import styles from "./placeDetailCard.module.css";
import { Card, Image } from "antd";
import { useRouter } from "next/router";

export default function PlaceDetailCard(props) {
  const { placeDetail } = props;
  const imgSrc = "/images/" + placeDetail.img;
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
          <Image src={imgSrc} alt=""  height={230}/>
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
          <p>{placeDetail.description}</p>
        </div>
      </Card>
    </div>
  );
}
