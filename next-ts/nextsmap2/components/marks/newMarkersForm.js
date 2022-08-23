import React from "react";
import { useRef } from "react";
import styles from './newMarkersForm.module.css'
export default function NewMarkersForm(props) {
  const nameInputRef = useRef();
  const timeInputRef = useRef();
  function submitHandler(event) {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredDate = timeInputRef.current.value;

    const markerTextData = {
      name: enteredName,
      date: enteredDate,
    };

    props.onAddMarker(markerTextData);
  }

  
  

  return (
    <div>
      <form className={styles.formDiv} onSubmit={submitHandler}>
        <div className={styles.smallDiv}>
          <label className={styles.labelDiv} htmlFor="name">Event Name</label>
          <input className={styles.inputDiv} type="text" required id="name" ref={nameInputRef} />
        </div>
        <div className={styles.smallDiv}>
          <label className={styles.labelDiv} htmlFor="date">Event Date</label>
          <input className={styles.inputDiv} type="datetime-local" required id="name" ref={timeInputRef} />
        </div>

        <button className={styles.action}>Add Event</button>
      </form>
    </div>
  );
}
