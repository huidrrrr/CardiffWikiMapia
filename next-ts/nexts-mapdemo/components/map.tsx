import React from "react";
import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Circle,
  MarkerClusterer,
} from "@react-google-maps/api";
import Places from "./place";
import cluster from "cluster";
import Distance from "./distance";

type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;

export default function Map() {
  const [office, setOffice] = useState<LatLngLiteral>();
  const [directions, setDirections] = useState<DirectionsResult>();
  const mapRef = useRef<GoogleMap>();
  const center = useMemo<LatLngLiteral>(
    () => ({ lat: 51.4837, lng: -3.1681 }),
    []
  );
  const options = useMemo<MapOptions>(
    () => ({
      mapId: "7f4dd82f5e97eadb",
      disableDefaultUI: true,
      clickableIcons: true,
    }),
    []
  );
  const onLoad = useCallback((map: any) => (mapRef.current = map), []);
  // const houses = useMemo(
  //   () => generateHouses(office ? office : center),
  //   [office, center]
  // );

  const fetchDirections = (house: LatLngLiteral) => {


    if (!office) return;

    const service = new google.maps.DirectionsService();

    const Res = service.route(
      {
        origin: house,
        destination: office,
        travelMode: google.maps.TravelMode.WALKING,
      },
      (result, status) => {
        if (status === "OK" && result) {
          console.log('previous direction data:');
          console.log();
                    
          setDirections(result);
          console.log('current direction data:'+directions);
        }
      }
    );
  };

  const icon = {
    url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
    scaledSize: new google.maps.Size(40, 40), // size
  };

  return (
    <div className="container">
      <div className="controls">
        <h1>commute?</h1>
        <Places
          setOffice={(position) => {
            setOffice(position);
            mapRef.current?.panTo(position);
          }}
        />

        {!office && <p>Enter the address of your office</p>}

        {directions && <Distance leg={directions.routes[0].legs[0]} />}
      </div>

      <div className="map">
        <GoogleMap
          zoom={10}
          center={center}
          mapContainerClassName="map-container"
          options={options}
          onLoad={onLoad}
        >
          {/* direction part here---------------------------------------- */}
          {directions && (
            <DirectionsRenderer
              directions={directions}
              options={{
                polylineOptions: {
                  zIndex: 50,
                  strokeColor: "#1976D2",
                  strokeWeight: 5,
                },
              }}
            />
          )}

          {office && (
            <>
              <Marker position={office} icon={icon} />

              {/* <MarkerClusterer>
                {(clusterer) =>
                  houses.map((house: LatLngLiteral) => (
                    <Marker
                      key={house.lat}
                      position={house}
                      clusterer={clusterer}
                      onClick={() => {
                        fetchDirections(house);
                      }}
                    />
                  ))
                }
              </MarkerClusterer> */}

              {/* <Circle center={office} radius={500} options={closeOptions} />
              <Circle center={office} radius={1000} options={middleOption} />
              <Circle center={office} radius={1500} options={farOption} /> */}
            </>
          )}
        </GoogleMap>
      </div>
    </div>
  );
}

const defaultOptions = {
  strokeOpacity: 0.5,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
};

const closeOptions = {
  ...defaultOptions,
  zIndex: 3,
  fillOpacity: 0.05,
  strokeColor: "#8BC34A",
  fillColor: "#8BC34A",
};

const middleOption = {
  ...defaultOptions,
  zIndex: 2,
  fillOpacity: 0.05,
  strokeColor: "#FBC02D",
  fillColor: "#FBC02D",
};

const farOption = {
  ...defaultOptions,
  zIndex: 1,
  fillOpacity: 0.05,
  strokeColor: "#FF5252",
  fillColor: "#FF5252",
};

const generateHouses = (position: LatLngLiteral) => {
  const _houses: Array<LatLngLiteral> = [];
  for (let i = 0; i < 10; i++) {
    const direction = Math.random() < 0.5 ? -100 : 100;
    _houses.push({
      lat: position.lat + Math.random() / direction,
      lng: position.lng + Math.random() / direction,
    });
  }
  return _houses;
};
