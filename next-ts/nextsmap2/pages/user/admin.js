import React from 'react'
import Layout from '../../components/pageLayout/pageLayout'
import { ReactSession } from "react-client-session";
export default function Admin() {
  return (
    
    <div>{ReactSession.get('username')}</div>
    
  )
}

export async function getStaticProps(){
  return {
    props:{
      userType:'admin'
    }
  }
}