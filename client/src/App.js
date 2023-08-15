import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "../src/page/Main/Main.js";
import Profile from "../src/page/Profile/Profile.js";
import Rangking from "../src/page/Rangking/Rangking.js";
import Vote from "../src/page/Vote/Vote.js";
import Post from "./page/Board/post.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/rangking" element={<Rangking />} />
        <Route path="/vote" element={<Vote />} />
        <Route path="/post" element={<Post />} />
      </Routes>
    </Router>
  );
}

export default App;
