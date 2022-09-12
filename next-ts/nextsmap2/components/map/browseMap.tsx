
import Map from "./map";


export default function MapPage(props: any) {
  const { places } = props;

  return <Map places={places}/>;
}
