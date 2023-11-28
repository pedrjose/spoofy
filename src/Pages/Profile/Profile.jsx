import { useState, useEffect } from "react";
import "./Profile.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../Components/Navbar/Navbar";

import { CreatePlaylistModal } from "../../Components/PlaylistModal/CreatePlaylistModal/CreatePlaylistModal";

export function ProfilePage() {
  const navigate = useNavigate();

  const [profilePhoto, setProfilePhoto] = useState("");
  const [profileEmail, setProfileEmail] = useState("");
  const [profileId, setProfileId] = useState("");

  const endSession = () => {
    Cookies.remove("sessionToken");
    Cookies.set("logged", "0");
    window.location.reload();
  };

  useEffect(() => {
    setProfilePhoto(Cookies.get("profileAvatar"));
    setProfileEmail(Cookies.get("profileEmail"));
    setProfileId(Cookies.get("profileId"));
  });
  return (
    <>
      <section className="section-profile-logged-settings">
        <Navbar />
        <span className="profile-container">
          <img className="profile-picture" src={profilePhoto} />
        </span>
        <button className="button-design" onClick={() => navigate("/learn")}>
          Aprender
        </button>
        <button className="button-design" onClick={() => navigate("/hotspot")}>
          HotSpot 10
        </button>
        <button className="button-design" onClick={() => endSession()}>
          Encerrar Sessão
        </button>
      </section>
    </>
  );
}
