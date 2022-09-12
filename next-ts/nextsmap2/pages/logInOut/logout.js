import React, { useState } from "react";
import { ReactSession } from "react-client-session";
import Router from "next/router";
export default function LogOut() {
  return (
    <div>
      <button
        onClick={() => {
          ReactSession.set("username", res.data.username);
          ReactSession.set("id", values.username);
          ReactSession.set("permission", res.data.permission);
          Router.push('/')
        }}
      >
        log out
      </button>
    </div>
  );
}
export async function getStaticProps(){
  return {
    props:{
      userType:'user'
    }
  }
}