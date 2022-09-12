import React from 'react'
import AddPlaceForm from '../../components/places/addPlaceForm'
export default function AddPlaceListPage() {
  return (
    <AddPlaceForm/>
  )
}
export async function getStaticProps(){
  return {
    props:{
      userType:'user'
    }
  }
}