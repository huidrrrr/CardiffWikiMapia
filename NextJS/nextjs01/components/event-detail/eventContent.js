import React from 'react'
import styles from './eventContent.module.css'
export default function EventContent(props) {
  return (
    <div  className={styles.content}>{props.children}</div>
  )
}
