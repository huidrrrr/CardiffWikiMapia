import { useContext } from "react";
import { Link } from "react-router-dom";
import FavoriteContext from "../../store/favourites-context";
import styles from './MainNavigation.module.css'

function MainNavigation(params) {

  const favouriteCtx= useContext(FavoriteContext)
  return (
    <header className={styles.header}>
      <div className={styles.logo}>Travel Sharing</div>
      <nav>
        <ul>
          <li>
            <Link to='/'>All Meetups</Link>
          </li>
          <li>
            <Link to='/new-meetups'>Add New Meetups</Link>
          </li>
          <li>
            <Link to='/favourites'>Favorites<span className={styles.badge}>
              {favouriteCtx.totalFavourites}</span></Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
