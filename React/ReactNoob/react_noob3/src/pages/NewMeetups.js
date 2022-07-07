import { useNavigate } from "react-router-dom";

import NewMeetupsForm from "../components/meetups/NewMeetupsForm";
import styles from "./NewMeetups.module.css";
function NewMeetupsPage(params) {
  const navigate = useNavigate();
  function addMeetupHandler(meetupData) {
    fetch(
      "https://raect-getting-start-default-rtdb.firebaseio.com/meetups.json",
      {
        method: "POST",
        body: JSON.stringify(meetupData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then(() => {
      navigate("/", { replace: true });
    });
  }
  return (
    <section>
      <h2 className={styles.title}>Add New Meetup</h2>
      <NewMeetupsForm onAddMeetup={addMeetupHandler} />
    </section>
  );
}

export default NewMeetupsPage;
