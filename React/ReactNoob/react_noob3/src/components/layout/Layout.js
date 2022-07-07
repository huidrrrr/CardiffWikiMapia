import React from 'react'
import MainNavigation from './MainNavigation'
import styles from './Layout.module.css'
import Footer from './Footer'
export default function layout(props) {
  return (
    <div>
        <MainNavigation/>
        <main className={styles.main}>
            {props.children}
        </main>
        <Footer/>
    </div>
  )
}
