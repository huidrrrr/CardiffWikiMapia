import React from "react";
import LoginForm from "../../components/logInOut/loginForm";
import PageLayout from "../../components/pageLayout/pageLayout";
import styles from './login.module.css'
export default function login() {

  return (
    
      <div className={styles.formBox}>
        <LoginForm />
      </div>
    
  );
}
