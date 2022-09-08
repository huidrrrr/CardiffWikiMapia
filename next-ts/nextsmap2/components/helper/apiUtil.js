import axios from "axios";
export async function getAllPlaces() {
  const response = await axios.get(
    "https://nextjs-dummydb-61545-default-rtdb.firebaseio.com/marks.json"
  );
  const placeData = [];
  for (const key in response.data) {
    placeData.push({
      id: key,
      ...response.data[key],
    });
  }
  return placeData;
}

export async function getPlaceById(id) {
  const allPlaces = await getAllPlaces();
  return allPlaces.find((place) => place.id === id);
}

export async function getPlusCode(position) {
  const url =
    "https://plus.codes/api?address=" + position.lat + "," + position.lng;
  const response = await axios.get(url);
  const plusCode = response.data.plus_code.global_code;
  return plusCode;
}

export async function addOneMissingPlace(place) {
  const url =
    "https://nextjs-dummydb-61545-default-rtdb.firebaseio.com/marks.json";
  const response = await axios({
    method: "post",
    url: url,
    data: JSON.stringify(place),
  });
  return response;
}

export async function getOneUpperPlaces(id) {
  const allPlaces = await getAllPlaces();
  return allPlaces.filter((place) => place.upperId === id);
}



// Comment api---------------------------------------------------------

export async function getOnePlaceAllComments(placeId){
  const url = `https://nextjs-dummydb-61545-default-rtdb.firebaseio.com/marks/${placeId}/comments.json`;
  const response = await axios({
    url:url,
  })
  return response
}


export async function addComment(placeId, comment) {
  const url = `https://nextjs-dummydb-61545-default-rtdb.firebaseio.com/marks/${placeId}/comments.json`;
  const response = axios({
    method: "post",
    url: url,
    data: JSON.stringify(comment),
  });
  return response;
}
