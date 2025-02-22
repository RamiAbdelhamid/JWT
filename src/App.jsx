
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import Login from "./Pages/Login";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/Login" element={<Login />} />

      </Routes>
    </Router>
  );
}

export default App;



