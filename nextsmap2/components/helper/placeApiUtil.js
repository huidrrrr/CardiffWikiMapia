import React from "react";
import axios from "axios";
export async function GetAllPlaces() {
  const response = await axios.get("http://localhost:8080/place/allPlace");
  const { data } = response;
  const placeDataList = [];
  for (let key in data) {
    
    const placesData = {
      id: data[key].id,
      name: data[key].name,
      category: data[key].category,
      description: data[key].description,
      author_id: data[key].author_id,
      position: {
        lat: data[key].lat,
        lng: data[key].lng,
      },
      img: data[key].img,
      state: data[key].state,
    };
    placeDataList.push(placesData);
  }

  return placeDataList;
}
