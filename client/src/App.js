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
import Post from "../src/page/Board/post.js";
import RPS from "../src/page/RPS/RPS.js";
import Choice from "../src/page/Choice/Choice.js";
import WriteList from "../src/page/Write/writeList";
import Write from "../src/page/Write/Write.js";
import WriteUpdate from "../src/page/Write/writeUpdate.js";

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
        <Route path="/post/:postId" element={<Post />} />
        <Route path="/RPS" element={<RPS />} />
        <Route path="/Choice" element={<Choice />} />
        <Route path="/writeList" element={<WriteList />} />
        <Route path="/Write" element={<Write />} />
        <Route path="/write/:postId" element={<WriteUpdate />} />
      </Routes>
    </Router>
  );
}

export default App;
