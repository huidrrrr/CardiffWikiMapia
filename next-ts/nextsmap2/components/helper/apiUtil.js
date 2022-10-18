import axios from "axios";
export async function getAllPlaces() {
  const response = await axios.get(
    "https://wikimapia-54a96-default-rtdb.firebaseio.com/places.json"
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
  const url = "https://wikimapia-54a96-default-rtdb.firebaseio.com/places.json";
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

export async function getOnePlaceAllComments(placeId) {
  const url = `https://wikimapia-54a96-default-rtdb.firebaseio.com/places/${placeId}/comments.json`;
  const response = await axios({
    method: "get",
    url: url,
  });
  return response;
}

export async function addComment(placeId, comment) {
  const url = `https://wikimapia-54a96-default-rtdb.firebaseio.com/places/${placeId}/comments.json`;
  const response = await axios({
    method: "post",
    url: url,
    data: JSON.stringify(comment),
  });
  return response;
}

//  event api-----------------------------------------------------------------
export async function getOnePlaceEventsByPlaceId(placeId) {
  const url = `https://wikimapia-54a96-default-rtdb.firebaseio.com/places/${placeId}/events.json`;
  const response = await axios({
    method: "get",
    url: url,
  });
  return response;
}
export async function addOneEvent(placeId, eventData) {
  const url = `https://wikimapia-54a96-default-rtdb.firebaseio.com/places/${placeId}/events.json`;
  const response = await axios({
    method: "post",
    url: url,
    data: JSON.stringify(eventData),
  });
  return response;
}

export async function addOneEventToDraft(
  event,
  placeId,
  eventId,
  editorId,
  currentTime
) {
  const url = `https://wikimapia-54a96-default-rtdb.firebaseio.com/eventDraft.json`;
  const eventData = {
    eventId:eventId,
    placeId: placeId,
    editorId: editorId,
    event: event,
    editedTime: currentTime,
    state:'auditing'
  };
  const response = await axios({
    method: "post",
    url: url,
    data: JSON.stringify(eventData),
  });
  return response;
}

export async function addOnePlaceToDraft(place, editorId, currentTime) {
  const url = `https://wikimapia-54a96-default-rtdb.firebaseio.com/placeDraft.json`;
  const placeData = {
    editorId: editorId,
    place: place,
    editedTime: currentTime,
    state: "auditing",
  };
  const response = await axios({
    method: "post",
    url: url,
    data: JSON.stringify(placeData),
  });
  return response;
}

export async function getAllDraftPlace() {
  const url = `https://wikimapia-54a96-default-rtdb.firebaseio.com/placeDraft.json`;
  const response = await axios({
    method: "get",
    url: url,
  });
  const placeDraftData = [];
  for (const key in response.data) {
    placeDraftData.push({
      id: key,
      ...response.data[key],
    });
  }
  return placeDraftData;
}
export async function updatePlaceInfoById(id, newData) {
  const url = `https://wikimapia-54a96-default-rtdb.firebaseio.com/places/${id}.json`;
  const response = await axios({
    method: "patch",
    url: url,
    data: newData,
  });
  return response;
}

export async function deletePlaceInfoById(id) {
  const url = `https://wikimapia-54a96-default-rtdb.firebaseio.com/places/${id}.json`;
  const response = await axios({
    method: "delete",
    url: url,
  });
  return response;
}

export async function updatePlaceDraftById(id, newState) {
  const url = `https://wikimapia-54a96-default-rtdb.firebaseio.com/placeDraft/${id}.json`;
  const response = await axios({
    method: "patch",
    url: url,
    data: newState,
  });
  return response;
}

export async function getAllPlaceDraftById(id) {
  const url = `https://wikimapia-54a96-default-rtdb.firebaseio.com/placeDraft/${id}.json`;
  const response = await axios({
    method: "get",
    url: url,
  });
  return response;
}

export async function getAllDraftEvents() {
  const url = `https://wikimapia-54a96-default-rtdb.firebaseio.com/eventDraft.json`;
  const response = await axios({
    method: "get",
    url: url,
  });
  const placeDraftData = [];
  for (const key in response.data) {
    placeDraftData.push({
      id: key,
      ...response.data[key],
    });
  }
  return placeDraftData;
}


export async function updateEventInfoById(placeId,eventId, newData) {
  const url = `https://wikimapia-54a96-default-rtdb.firebaseio.com/places/${placeId}/events/${eventId}.json`;
  const response = await axios({
    method: "patch",
    url: url,
    data: newData,
  });
  return response;
}

export async function updateEventDraftById(id, newState) {
  const url = `https://wikimapia-54a96-default-rtdb.firebaseio.com/eventDraft/${id}.json`;
  const response = await axios({
    method: "patch",
    url: url,
    data: newState,
  });
  return response;
}

export async function getAllPatchs(){
  const url =`https://wikimapia-54a96-default-rtdb.firebaseio.com/patchMessage.json`
  const response = await axios({
    method:'get',
    url:url,
  })
  const patchLst = [];
  for (const key in response.data) {
    patchLst.push({
      id: key,
      ...response.data[key],
    });
  }
  return patchLst
}