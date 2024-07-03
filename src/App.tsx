// import { useState } from "react";
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import CreateAccount from "./components/CreateAccount";
import Login from "./components/Login";
import About from "./components/About";
import "./App.css";
import ComicList from "./components/ComicList";
import FrontPage from "./components/FrontPage";
import VelhonTaloudenhoitaja from "./components/VelhonTaloudenhoitaja";

function App() {
  return (
    <Router>
      <div>
        <Link to="/">Home</Link>

        <Link to="/about">About author</Link>
        <Link to="/createaccount">Create Account</Link>
        <Link to="/login">Sign in</Link>
      </div>

      <Routes>
        <Route
          path="/"
          element={
            <>
              <FrontPage />

              <ComicList />
            </>
          }
        />

        <Route path="/createaccount" element={<CreateAccount />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/comics/1" element={<VelhonTaloudenhoitaja />} />
      </Routes>
      <div>
        <i>Stina Palomäki 2024</i>
      </div>
    </Router>
  );
}

export default App;
