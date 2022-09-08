import React from "react";
import { useState } from "react";
import {
  getOneUpperPlaces,
  getAllPlaces,
} from "../../components/helper/apiUtil";
import { Button, Tooltip } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import SearchInput from "../../components/places/searchInput/searchInput";
import PlaceList from "../../components/places/placesListComp";
import BackTopComp from "../../components/pageLayout/backTop";
export default function PlaceHistoryList(props) {
  const { filteredPlaces, placeNameList, placeCategoryList } = props;
  const [placeData, setPlaceData] = useState(filteredPlaces);

  const changeData = (results) => {
    setPlaceData(results);
  };

  const refreshHandler = () => {
    setPlaceData(filteredPlaces);
  };

  const style = {
    display: "flex",
    gap: "1rem",
    margin: "1rem auto 2rem 0",
  };

  return (
    <div>
      <h2>Search</h2>
      <div style={style}>
        <SearchInput
          placesData={filteredPlaces}
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

export async function getStaticProps(context) {
  const { upperId } = context.params;
  const places = await getOneUpperPlaces(parseInt(upperId));
  // set place name list ------------------------------
  const placeNameList = places.map((place) => place.name);

  // set place category list

  const placeCategoryList = places.map((place) => place.category);
  return {
    props: {
      filteredPlaces: places,
      placeNameList: placeNameList,
      placeCategoryList: placeCategoryList,
    },
    revalidate: 1800,
  };
}

export async function getStaticPaths() {
  const places = await getAllPlaces();
  const upperId = places.map((place) => ({
    params: { upperId: place.upperId.toString() },
  }));
  return {
    paths: upperId,
    fallback: false,
  };
}
