import React from 'react'
import styles from './logisticsItem.module.css'
export default function LogisticsItem(props) {
  return (
    <li>
        <span>
            
        </span>
        <span className={styles.content}>{props.children}</span>
    </li>
  )
}
