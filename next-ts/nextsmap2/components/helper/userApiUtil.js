import React from "react";
import axios from "axios";
export async function userApiUtil() {
  // const response = await axios.get("http://localhost:8080/user");
  const response = await axios.get(
    "https://nextjs-dummydb-61545-default-rtdb.firebaseio.com/user.json"
  );
  response.then((res) => {
    return res.data;
  });
}

export async function getUserById(id) {
  const url =
    `https://nextjs-dummydb-61545-default-rtdb.firebaseio.com/user/${id}.json`;
  const response = await axios({
    method: "get",
    url: url,
  });
  return response;
}
