import axios from "axios";
import React from "react";

export default function Test() {
  
  const response = axios.get(
    "http://localhost:8080/place/1"
  );
    response.then((res) => { 
      console.log(res.data);
     })

  
  return <div>home</div>;
}
