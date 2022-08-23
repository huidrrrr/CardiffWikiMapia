import React, { useState } from "react";
import { ReactSession } from "react-client-session";
import Router from "next/router";
export default function LogOut() {
  const [isLogin, setLoginstate] = useState(false);
  const logoutHandler = () => {
    ReactSession.set("username", "");
    setLoginstate(true);
  };
  return (
    <div>
      {isLogin ? (
        <p>log out successfully</p>
      ) : (
        <button onClick={logoutHandler}>log out</button>
      )}
    </div>
  );
}
