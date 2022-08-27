import React from "react";
import axios from "axios";
export async function userApiUtil() {
  const response = await axios.get("http://localhost:8080/user");
  response.then((res) => {
    return res.data;
  });
}

export async function getPlaceById(id) {

}
