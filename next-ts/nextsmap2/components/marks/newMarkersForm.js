import React from "react";
import { useRef } from "react";

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
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="name">Event Name</label>
          <input type="text" required id="name" ref={nameInputRef} />
        </div>
        <div>
          <label htmlFor="date">Event Date</label>
          <input type="datetime-local" required id="name" ref={timeInputRef} />
        </div>

        <button>Add Event</button>
      </form>
    </div>
  );
}
