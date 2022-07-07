import { Route, Routes } from "react-router-dom";
import AllMeetupsPage from "./pages/AllMeetups";
import NewMeetupsPage from "./pages/NewMeetups";
import FavourtesPage from "./pages/Favorites";
import Layout from './components/layout/Layout'


function App() {
  return (
    <Layout>
      
      <Routes>
        <Route path="/" element={<AllMeetupsPage />} />
        <Route path="/new-meetups" element={<NewMeetupsPage />} />
        <Route path="/favourites" element={<FavourtesPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
