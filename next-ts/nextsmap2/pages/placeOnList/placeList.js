import React, { useEffect, useState } from "react";
import PlaceList from "../../components/places/placesListComp";
import { getAllPlaces } from "../../components/helper/apiUtil";
import SearchInput from "../../components/places/searchInput/searchInput";
import styles from "./placeList.module.css";
import { ReloadOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import BackTopComp from "../../components/pageLayout/backTop";
export default function PlaceListPage(props) {
  let { places, placeNameList, placeCategoryList } = props;
  const [placeData, setPlaceData] = useState(places);

  const changeData = (results) => {
    setPlaceData(results);
  };

  const refreshHandler = () => {
    setPlaceData(places);
  };

  return (
    <div>
      <h2>Search</h2>
      <div className={styles.searchBar}>
        <SearchInput
          placesData={places}
          placeNameData={placeNameList}
          placeCategoryData={placeCategoryList}
          clickHandler={changeData}
        />
        <Tooltip title="Refresh">
          <Button
            shape="circle"
            icon={<ReloadOutlined />}
            onClick={refreshHandler}
          ></Button>
        </Tooltip>
      </div>

      <PlaceList places={placeData} />
      <BackTopComp />
    </div>
  );
}
export async function getStaticProps() {
  const places = await getAllPlaces();
  // set place name list ------------------------------
  const placeNameList = places.map((ele) => ele.name);

  // set place category list

  const placeCategoryList = places.map((ele) => ele.category);

  return {
    props: {
      places: places,
      placeNameList: placeNameList,
      placeCategoryList: placeCategoryList,
      userType:'user'
    },
    revalidate: 1800,
  };
}
