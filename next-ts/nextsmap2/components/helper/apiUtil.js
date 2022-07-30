export async function getAllEvents() {
  const response = await fetch(
    "https://nextjs-dummydb-61545-default-rtdb.firebaseio.com/marks.json"
  );
  const data = await response.json();
  
  return events;
}
