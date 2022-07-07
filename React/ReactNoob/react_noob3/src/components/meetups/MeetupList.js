import MeetupItem from "./MeetupItem";
import styles from './MeetupList.module.css'

function MeetupList(props) {
  return (
    <ul className={styles.card}>
      {props.meetups.map((meetups) => (
        <MeetupItem
          key={meetups.id}
          id={meetups.id}
          image={meetups.image}
          name={meetups.name}
          address={meetups.address}
          description={meetups.description}
        />
      ))}
    </ul>
  );
}

export default MeetupList;
