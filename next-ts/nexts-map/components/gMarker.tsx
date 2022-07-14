import React from "react";

export default function GMarker(props:google.maps.MarkerOptions) {
  const Marker: React.FC<google.maps.MarkerOptions> = (options) => {
    const [marker, setMarker] = React.useState<google.maps.Marker>();

    React.useEffect(() => {
      if (!marker) {
        setMarker(new google.maps.Marker());
      }

      // remove marker from map on unmount
      return () => {
        if (marker) {
          marker.setMap(null);
        }
      };
    }, [marker]);

    React.useEffect(() => {
      if (marker) {
        marker.setOptions(options);
      }
    }, [marker, options]);

    return <Marker />;
  };
  return null;
}
