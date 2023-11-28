import "./PlaylistsPage.css";
import { PlaylistCard } from "../../Components/PlaylistCard/PlaylistCard";
import { findUserPlaylists } from "../../Services/playlist.service";

import Cookies from "js-cookie";

import { useState, useEffect } from "react";

export function PlaylistsPage() {
  const [playlists, setPlaylists] = useState([]);
  const [profileId, setProfileId] = useState("");

  const findPlaylists = async () => {
    const response = await findUserPlaylists(Cookies.get("profileId"));

    setPlaylists(response);
  };

  useEffect(() => {
    findPlaylists();
  });
  return (
    <>
      <section className="section-playlist-settings">
        {playlists
          ? playlists.map((item, index) => {
              return <PlaylistCard key={index} props={item} />;
            })
          : null}
      </section>
    </>
  );
}
