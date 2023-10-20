import "./Navbar.css";
import { Link } from "react-router-dom";

import spoofy from "../../../public/logo/spoofy.png";
import profile from "../../../public/logo/profile.png";

export function Navbar() {
  return (
    <>
      <div className="navbar">
        <Link to="/">
          <img className="img-settings" src={spoofy} />
        </Link>
        <Link to="/profile">
          <img className="img-settings profile-button-effect " src={profile} />
        </Link>
      </div>
    </>
  );
}
