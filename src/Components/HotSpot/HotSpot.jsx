import "./HotSpot.css";
import { Link } from "react-router-dom";
import { useState } from "react";

export const HotSpotTrend = ({ props }) => {
  const [hotspotLyric, setHotspotLyric] = useState(
    `/lyric/${props.artist}/${props.music}`
  );
  return (
    <>
      <span className="hotspot-container">
        <Link to={hotspotLyric}>
          <h3 className="music-name">{props.music}</h3>
          <h4>{props.artist}</h4>
        </Link>
      </span>
    </>
  );
};
