import axios from "axios";
export async function getAllPlaces() {
  const response = await axios.get(
    "https://nextjs-dummydb-61545-default-rtdb.firebaseio.com/marks.json"
  )
  const placeData =[]
  for (const key in response.data) {
    placeData.push({
      id:key,
      ...response.data[key]
    })
  }
  return placeData;
}
