import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import "./Search.css";
import { Link } from "react-router-dom";
import { SearchModal } from "../../Components/Modal/search.component";

import { SearchLyricAnimation } from "../../Components/Animation/Loader";
import spoofy from "../../../public/logo/spoofy.png";
import profile from "../../../public/logo/profile.png";

export const SearchPage = () => {
  const logout = () => {
    Cookies.remove("sessionToken");
    Cookies.set("logged", "0");
    window.location.reload();
  };

  return (
    <>
      <section className="section-settings">
        <div className="navbar">
          <Link to="/">
            <img className="img-settings" src={spoofy} />
          </Link>
          <Link to="/">
            <img
              className="img-settings profile-button-effect "
              src={profile}
            />
          </Link>
        </div>
        <span>
          <SearchModal />
        </span>
      </section>
    </>
  );
};
