import axios from "axios";
import React from "react";

import NewMarkersForm from "./newMarkersForm";



export default function NewMarkers(props) {
  function addNewMarker(markerTextData) {
    const markerData = {
      name: markerTextData.name,
      date: markerTextData.date,
      position: {
        lat: props.position.lat,
        lng: props.position.lng,
      },
    };

    fetch(
      "https://nextjs-dummydb-61545-default-rtdb.firebaseio.com/marks.json",
      {
        method: "POST",
        body: JSON.stringify(markerData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then(() => {
      alert("add event successfully!");
      getNewData();
    });

  }

  return (
    <section>
      <NewMarkersForm onAddMarker={addNewMarker} getData/>
    </section>
  );

  function getNewData() {
    axios({
      method: "GET",
      url: "https://nextjs-dummydb-61545-default-rtdb.firebaseio.com/marks.json",
    }).then((res) => {
      const events= [];
      for (const key in res.data) {
        events.push({
          id: key,
          ...res.data[key],
        });
        
      }
      props.setEventsData(events)
     
      
    });
  };
}
