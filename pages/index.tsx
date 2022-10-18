import React from "react";
import Test from "../components/test";
import Login from "../components/logInOut/loginForm";
import { Image } from "antd";

export default function Home() {
  return (
    <div style={{display: "flex",
      width: "max-content",
      margin: "16rem auto",
      gap: "9rem"
  }}>
      <div style={{ width: "23rem"}}>
        <Image preview={false} src="/images/logo2.png" alt="logo"></Image>
      </div>
      <div style={{ width: "max-content", margin: "5rem auto" }}>
        <Login />
      </div>
    </div>
  );
}
