import React from 'react'
import styles from './errorAlert.module.css'

export default function ErrorAlert(props) {
  return (
    <div className={styles.alertBlock}>
        {props.children}
    </div>
  )
}
