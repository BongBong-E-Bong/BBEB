import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "../src/page/Main/Main.js";
import Profile from "../src/page/Profile/Profile.js";
import Onebong from "../src/page/Profile/Onebong.js";
import Twobong from "../src/page/Profile/Twobong.js";
import Threebong from "../src/page/Profile/Threebong.js";
import Fivebong from "./page/Profile/Fivebong.js";
import Sixbong from "../src/page/Profile/Sixbong.js";
import Sevenbong from "../src/page/Profile/Sevenbong.js";
import Eightbong from "../src/page/Profile/Eightbong.js";
import Ranking from "../src/page/Ranking/Ranking.js";
import Vote from "../src/page/Vote/Vote.js";
import Post from "../src/page/Board/post.js";
import Choice from "../src/page/Choice/Choice.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/onebong" element={<Onebong />} />
        <Route path="/twobong" element={<Twobong />} />
        <Route path="/threebong" element={<Threebong />} />
        <Route path="/fivebong" element={<Fivebong />} />
        <Route path="/sixbong" element={<Sixbong />} />
        <Route path="/sevenbong" element={<Sevenbong />} />
        <Route path="/eightbong" element={<Eightbong />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/vote" element={<Vote />} />
        <Route path="/post" element={<Post />} />
        <Route path="/Choice" element={<Choice />} />
      </Routes>
    </Router>
  );
}

export default App;
