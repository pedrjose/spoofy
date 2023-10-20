import "./LyricLine.css";

export function LyricLine({ props }) {
  return (
    <>{props === "" ? <br /> : <p className="lyric-line-color">{props}</p>}</>
  );
}