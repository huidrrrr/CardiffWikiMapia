import React from 'react'
import Places from '../map/places'
import styles from './browsePlaceSideBar.module.css'
export default function BrowsePlaceSideBar(props) {
    const sendData=(position)=>{
        props.setOffice(position)
    }
  return (
    <div className={styles.inputPlace}>
    <h3 className={styles.h3Style}>Home</h3>
    <Places
      setOffice={
        sendData
    }
    />
  </div>
  )
}
