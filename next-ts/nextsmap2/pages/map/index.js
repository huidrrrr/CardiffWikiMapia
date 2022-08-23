import MapPage from "../../components/map/mapPage";
import { getAllPlaces } from "../../components/helper/apiUtil";

export default function MapTestPage(props) {
  const {places} = props;
  return (
    <MapPage places={places}></MapPage>
  )
}

export async function getStaticProps() {
  const places = await getAllPlaces();
  
  return {
    props: {
      places: places,
    },
    revalidate: 1800,
  };
}
