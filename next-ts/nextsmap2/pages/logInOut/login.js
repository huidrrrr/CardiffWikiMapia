import React from "react";
import Login from "../../components/logInOut/login";
import PageLayout from "../../components/pageLayout/pageLayout";
import styles from './login.module.css'
export default function login() {

  return (
    
      <div className={styles.formBox}>
        <Login />
      </div>
    
  );
}
