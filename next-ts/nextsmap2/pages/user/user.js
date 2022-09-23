import React from "react";
import Layout from "../../components/pageLayout/pageLayout";
import { ReactSession } from "react-client-session";
import Test from '../../components/test'
export default function User() {

  return (
    <div>
      <div>{ReactSession.get('username')}
      </div>
      <Test/>

      
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