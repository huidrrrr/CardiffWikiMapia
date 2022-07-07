import { useContext } from "react";

import styles from "./MeetupItem.module.css";
import React from "react";
import "antd/dist/antd.min.css";
import Card from "../ui/Card";
import FavoriteContext from "../../store/favourites-context";

function MeetupItem(props) {
  const favouriteCtx = useContext(FavoriteContext);
  const itemIsFavourite = favouriteCtx.ItemIsFavourite(props.id);


  function toggleFavouriteStatusHandler(params) {
    if (itemIsFavourite) {
      favouriteCtx.removeFavourite(props.id)
    }else{
      favouriteCtx.addFavourite({
        id:props.id,
        title:props.title,
        description:props.description,
        image:props.image,
        address:props.address,
      })
    }
  }
  return (
    <Card>
      <li className={styles.item}>
        <div className={styles.image}>
          <img src={props.image} alt={props.id} />
        </div>
        <div className={styles.content}>
          <h3>{props.name}</h3>
          <p>{props.address}</p>
          <p>{props.description}</p>
        </div>
        <div>
          <button className={styles.button} onClick={toggleFavouriteStatusHandler}>{itemIsFavourite?'Remove from Favourites':'To Favourites'}</button>
        </div>
      </li>
    </Card>
  );
}
export default MeetupItem;
