import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Circle,
  MarkerClusterer,
} from "@react-google-maps/api";
import Places from "./places";
import Distance from "./distance";
import NewMarkers from "../marks/newMarkers";
import { getAllEvents } from "../helper/apiUtil";
import axios from "axios";
import styles from "../../styles/Map.module.css";

type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;

export default function Map(props: any) {
  const [office, setOffice] = useState<LatLngLiteral>();
  const [eventsData, setEventsData] = useState<any>([]);
  const [destination, setDestination] = useState<LatLngLiteral>();
  const [directions, setDirections] = useState<DirectionsResult>();
  const mapRef = useRef<GoogleMap>();

  useEffect(() => {
    axios({
      method: "GET",
      url: "https://nextjs-dummydb-61545-default-rtdb.firebaseio.com/marks.json",
    }).then((res) => {
      const events: any = [];
      for (const key in res.data) {
        events.push({
          id: key,
          ...res.data[key],
        });
        setEventsData(events);
      }
    });
  }, []);

  const center = useMemo<LatLngLiteral>(
    () => ({ lat: 51.4837, lng: -3.1681 }),
    []
  );
  const options = useMemo<MapOptions>(
    () => ({
      mapId: "7f4dd82f5e97eadb",
      disableDefaultUI: false,
      clickableIcons: true,
    }),
    []
  );
  const onLoad = useCallback((map: any) => (mapRef.current = map), []);

  const fetchDirections = (house: LatLngLiteral) => {
    if (!office && !destination) return;

    const service = new google.maps.DirectionsService();
    service.route(
      {
        origin: house,
        destination: office!,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK" && result) {
          setDirections(result);
        }
      }
    );
  };

  const homeIcon = {
    url: "/icons/home.svg", // url
    scaledSize: new google.maps.Size(30, 30), // scaled size
    origin: new google.maps.Point(0, 0), // origin
    // anchor: new google.maps.Point(0, 0) // anchor
  };

  const eventIcon = {
    url: "/icons/event.svg", // url
    scaledSize: new google.maps.Size(30, 30), // scaled size
    origin: new google.maps.Point(0, 0), // origin
    // anchor: new google.maps.Point(0, 0) // anchor
  };
  return (
    <div className="container">
      <div className="controls">
        <h1>Commute?</h1>
        <div className={styles.inputPlace}>
          <h3>Home</h3>
          <Places
            setOffice={(position) => {
              setOffice(position);
              mapRef.current?.panTo(position);
            }}
          />
        </div>
        <div className={styles.inputPlace}>
          <h3>Destination</h3>
          <Places
            setOffice={(position) => {
              setDestination(position);
              mapRef.current?.panTo(position);
            }}
          />
        </div>

        {!office && <p>Enter the address of your office.</p>}
        {directions && <Distance leg={directions.routes[0].legs[0]} />}
        {destination && (
          <NewMarkers
            position={destination}
            setEventsData={(events: any) => {
              setEventsData(events);
            }}
          />
        )}
      </div>
      <div className="map">
        <GoogleMap
          zoom={10}
          center={center}
          mapContainerClassName="map-container"
          options={options}
          onLoad={onLoad}
        >
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
              <Marker position={office} icon={homeIcon} />

              {
                <MarkerClusterer>
                  {(clusterer) =>
                    eventsData.map((event: any) => (
                      <Marker
                        key={event.id}
                        position={event.position}
                        icon={eventIcon}
                        clusterer={clusterer}
                        onClick={() => {
                          fetchDirections(event.position);
                        }}
                      />
                    ))
                  }
                </MarkerClusterer>
              }

              <Circle center={office} radius={500} options={closeOptions} />
              <Circle center={office} radius={1000} options={middleOptions} />
              <Circle center={office} radius={1500} options={farOptions} />
            </>
          )}
          {destination && (
            <>
              <Marker
                position={destination}
                onClick={() => {
                  fetchDirections(destination);
                }}
              />
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
const middleOptions = {
  ...defaultOptions,
  zIndex: 2,
  fillOpacity: 0.05,
  strokeColor: "#FBC02D",
  fillColor: "#FBC02D",
};
const farOptions = {
  ...defaultOptions,
  zIndex: 1,
  fillOpacity: 0.05,
  strokeColor: "#FF5252",
  fillColor: "#FF5252",
};

// const generateHouses = (position: LatLngLiteral) => {
//   const _houses: Array<LatLngLiteral> = [];
//   for (let i = 0; i < 100; i++) {
//     const direction = Math.random() < 0.5 ? -2 : 2;
//     _houses.push({
//       lat: position.lat + Math.random() / direction,
//       lng: position.lng + Math.random() / direction,
//     });
//   }
//   return _houses;
// };

// export async function getStaticProps() {

//   const events = await getAllEvents();
//   console.log("got data");

//   return {
//     props: {
//       events: events,
//     },
//     revalidate: 1800,
//   };
// }
