import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { Redirect } from "./Components/Redirect/Redirect";
import { Home } from "./Pages/Home/Home";
import { Login } from "./Pages/Login/Login";
import { SignUp } from "./Pages/SignUp/SignUp";
import { SearchPage } from "./Pages/Search/Search";
import { ProfilePage } from "./Pages/Profile/Profile";
import { LyricPage } from "./Pages/Lyric/Lyric";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={Cookies.get("sessionToken") ? <SearchPage /> : <Home />}
        ></Route>
        <Route
          path="/login"
          element={!Cookies.get("sessionToken") ? <Login /> : <Redirect />}
        ></Route>
        <Route
          path="/sign-up"
          element={!Cookies.get("sessionToken") ? <SignUp /> : <Redirect />}
        ></Route>
        <Route
          path="/profile"
          element={Cookies.get("sessionToken") ? <ProfilePage /> : <Redirect />}
        ></Route>
        <Route
          path="/lyric/:artist/:music"
          element={Cookies.get("sessionToken") ? <LyricPage /> : <Redirect />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
