import "./Lyric.css";
import { useParams } from "react-router-dom";
import { Navbar } from "../../Components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { NotFound } from "../../Components/NotFound/NotFound";
import { LyricLine } from "../../Components/LyricLine/LyricLine";
import { useEffect, useState } from "react";

import { findLyrics } from "../../Services/music.service";
import { decodeParamsWithSpaces } from "../../Services/decode.service";

import translate from "../../../public/logo/translate.png";
import brain from "../../../public/logo/brain.png";
import download from "../../../public/logo/download.png";
import search from "../../../public/logo/search.png";
import explicit from "../../../public/logo/explicit.png";

export function LyricPage() {
  const navigate = useNavigate();
  
  const [pageData, setPageData] = useState({ promiseSolved: false });
  const [solvingPromise, setSolvingPromise] = useState(true);
  const [errorPromise, setErrorPromise] = useState(false);

  const [lyricTranslate, setLyricTranslate] = useState(false);

  const { artist } = useParams();
  const { music } = useParams();

  const findingLyric = async (artist, music) => {
    const lyric = await findLyrics(artist, music);

    if (!lyric.promiseSolved) {
      setErrorPromise(true);
      setSolvingPromise(false);
      return;
    }

    if (lyric.promiseSolved) {
      setErrorPromise(false);
      setSolvingPromise(false);
      setPageData(lyric);
    }
  };

  const translateLyric = () => {
    !lyricTranslate ? setLyricTranslate(true) : setLyricTranslate(false);
  };

  const searchAgain = () => {
    navigate("/");
  };

  useEffect(() => {
    const decodeParams = decodeParamsWithSpaces({ artist, music });

    findingLyric(decodeParams.artist, decodeParams.music);
  }, []);

  return (
    <>
      <Navbar />
      <section className="lyric-page-settings">
        <div className="justify-content-lyrics">
          {pageData.promiseSolved && pageData.badwords ? (
            <img src={explicit} className="explicit-icon" />
          ) : null}
          {pageData.promiseSolved ? (
            <h1 className="lyric-name">{pageData.musicName}</h1>
          ) : null}
          {pageData.promiseSolved ? (
            <h2 className="artist-name">{pageData.artist}</h2>
          ) : null}

          <br />
          {pageData.promiseSolved && !lyricTranslate
            ? pageData.musicLyric.map((item, index) => {
                return <LyricLine key={index} props={item} />;
              })
            : null}
          {pageData.promiseSolved && lyricTranslate
            ? pageData.translate.map((item, index) => {
                return <LyricLine key={index} props={item} />;
              })
            : null}
        </div>
        <div className="justify-content-not-found">
          {errorPromise ? <NotFound /> : null}
        </div>
        {pageData.promiseSolved ? (
          <span className="lyric-button">
            <button onClick={() => translateLyric()}>
              <img
                src={translate}
                alt="Translate Button"
                className="icon-buttons"
              />
            </button>
            <button>
              <img src={brain} alt="Learn Button" className="icon-buttons" />
            </button>
            <button>
              <img
                src={download}
                alt="Download Button"
                className="icon-buttons"
              />
            </button>
            <button onClick={() => searchAgain()}>
              <img src={search} alt="Search Button" className="icon-buttons" />
            </button>
          </span>
        ) : null}
      </section>
    </>
  );
}
