import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Circle,
  MarkerClusterer,
} from "@react-google-maps/api";
import Distance from "./distance";
import PlaceDetailCard from "../places/placeDetailCard/placeDetailCard";
import BrowsePlaceSideBar from "../mapSideBar/browsePlaceSideBar";


type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;

export default function Map(props: any) {
  const [office, setOffice] = useState<LatLngLiteral>();
  const [destination, setDestination] = useState<LatLngLiteral>();
  const [directions, setDirections] = useState<DirectionsResult>();
  const [placeDetail, setPlaceDetail] = useState<any>();
  const mapRef = useRef<GoogleMap>();

  const { places } = props;
  const [placeData, setPlaceData] = useState<any>(places);
  // set map default center-----------------------------------------------------
  const center = useMemo<LatLngLiteral>(
    () => ({ lat: 51.4837, lng: -3.1681 }),
    []
  );
  const options = useMemo<MapOptions>(
    () => ({
      mapId: "7f4dd82f5e97eadb",
      disableDefaultUI: false,
      clickableIcons: false,
    }),
    []
  );

  const onLoad = useCallback((map: any) => (mapRef.current = map), []);

  // set direction-----------------------------------------------------
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
  // show plcaeDetail after click the place icon-----------------------------------------------------
  const showDetail = (event: any) => {
    setPlaceDetail(event);
  };

  const homeIcon = {
    url: "/icons/home.svg", // url
    scaledSize: new google.maps.Size(30, 30), // scaled size
    origin: new google.maps.Point(0, 0), // origin
  };

  const eventIcon = {
    url: "/icons/event.svg", // url
    scaledSize: new google.maps.Size(30, 30), // scaled size
    origin: new google.maps.Point(0, 0), // origin
  };
  const h3Style = { color: "white" };

  return (
    <div className="container">
      <div className="controls">
        <BrowsePlaceSideBar
          setOffice={(position: any) => {
            setOffice(position);
            mapRef.current?.panTo(position);
          }}
        />

        {directions && <Distance leg={directions.routes[0].legs[0]} />}
        {placeDetail && <PlaceDetailCard placeDetail={placeDetail} />}

        {!office && <p>Enter the address you want to.</p>}


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

              {placeData && (
                <MarkerClusterer>
                  {(clusterer) =>
                    placeData.map((event: any) => (
                      <Marker
                        key={event.id}
                        position={event.position}
                        icon={{
                          url: "/icons/" + event.category + ".svg", // url
                          scaledSize: new google.maps.Size(30, 30), // scaled size
                          origin: new google.maps.Point(0, 0), // origin
                        }}
                        clusterer={clusterer}
                        onClick={() => {
                          fetchDirections(event.position);
                          showDetail(event);
                        }}
                      />
                    ))
                  }
                </MarkerClusterer>
              )}

              <Circle center={office} radius={500} options={closeOptions} />
              <Circle center={office} radius={1000} options={middleOptions} />
              <Circle center={office} radius={1500} options={farOptions} />
            </>
          )}
          {destination && (
            <>
              <Marker
                icon={eventIcon}
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

// distance circle-----------------------------------------------------


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
