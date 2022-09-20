import React from "react";
import axios from "axios";
export async function userApiUtil() {
  // const response = await axios.get("http://localhost:8080/user");
  const response = await axios.get(
    "https://wikimapia-54a96-default-rtdb.firebaseio.com/users.json"
  );
  response.then((res) => {
    return res.data;
  });
}

export async function getUserById(id) {
  const url = `https://wikimapia-54a96-default-rtdb.firebaseio.com/users/${id}.json`;
  const response = await axios({
    method: "get",
    url: url,
  });
  return response;
}

export async function getAllUsers() {
  const url = `https://wikimapia-54a96-default-rtdb.firebaseio.com/users.json`;
  const response = await axios({
    method: "get",
    url: url,
  });

  const usersData = [];
  for (const key in response.data) {
    usersData.push({
      key: key,
      ...response.data[key],
    });
  }
  return usersData;
}
export async function updateUserById(id,newData) {
  const url = `https://wikimapia-54a96-default-rtdb.firebaseio.com/users/${id}.json`;
  const response = await axios({
    method: "put",
    url: url,
    data:newData
  });
  return response;
}
export async function deleteUserById(id) {
  const url = `https://wikimapia-54a96-default-rtdb.firebaseio.com/users/${id}.json`;
  const response = await axios({
    method: "delete",
    url: url,
  });
  return response;
}