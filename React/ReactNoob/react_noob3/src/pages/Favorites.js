import { useContext } from "react";
import FavoriteContext from "../store/favourites-context";
import MeetupList from "../components/meetups/MeetupList";
function FavourtesPage(params) {
  const favouriteCtx = useContext(FavoriteContext);
  let content;

  if (favouriteCtx.totalFavourites === 0) {
    content = <p>You got no favourites yet. Start adding some?</p>;
  } else {
    content = <MeetupList meetups={favouriteCtx.favourites} />;
  }

  return (
    <section>
      <h1>My Favorites</h1>
      {content}
    </section>
  );
}

export default FavourtesPage;
