import { useState, useEffect } from "react";
import MeetupList from "../components/meetups/MeetupList";
import styles from "./AllMeetups.module.css";

function AllMeetupsPage(params) {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedMeetups, setLoadedMeetups] = useState([]);

  useEffect(() => {
    setIsLoading(true)
    fetch(
      "https://raect-getting-start-default-rtdb.firebaseio.com/meetups.json"
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {

        const meetups =[];

  
        for (const key in data) {
          console.log('test key is '+key);  
          
        }

        for (const key in data) {
          console.log('data is'+data);
          console.log('key is'+key);
          console.log(data);
          const meetup={
            id:key,
            ...data[key]
          };
          meetups.push(meetup)
            
          
        }
        setIsLoading(false);
        setLoadedMeetups(meetups);
      });
  }, []);

  if (isLoading) {
    return (
      <section>
        <p>Loading data...</p>
      </section>
    );
  }

  return (
    <div>
      <h2 className={styles.title}>All Meetups</h2>
      <MeetupList meetups={loadedMeetups} />
    </div>
  );
}

export default AllMeetupsPage;
