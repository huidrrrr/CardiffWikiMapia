const DUMMY_DATA = [
  {
    id: "e1",
    title: "Programming for everyone",
    description: "This is for everyone",
    location: "New Port Road, building 21 flat 14 room B112",
    date: "2022-04-08",
    image: "images/programming-event.jpg",
    isFeatured: true,
  },
  {
    id: "e2",
    title: "Cooking class for everyone",
    description: "Learn how to cook!",
    location: "EC accommadation, Road 24",
    date: "2022-04-11",
    image: "images/cook-event.jpg",
    isFeatured: true,
  },
  {
    id: "e3",
    title: "Sing and Dance!",
    description: "Become a artist",
    location: "Crown Place, 24 street",
    date: "2021-05-25",
    image: "images/sing-event.jpg",
    isFeatured: true,
  },
];

export function getFeaturedEvents() {
  return DUMMY_DATA.filter((event)=> event.isFeatured);
}

export function getAllEvents() {
  return DUMMY_DATA;
}

export const getFilteredEvents = (dateFilter) => {
  const { year, month } = dateFliter;
  let filteredEvents = DUMMY_DATA.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });
  return filteredEvents;
};
export const getEventById = (id) => {
  return DUMMY_DATA.find((event) => event.id === id);
};
