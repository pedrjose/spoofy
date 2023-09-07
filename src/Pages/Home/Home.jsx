import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./Home.css";

export function Home() {
  const [classhome, setClasshome] = useState("section-settings1");
  const [homeTitle, setHomeTitle] = useState("Ache seus song lyrics favoritos");

  useEffect(() => {
    const interval = setInterval(() => {
      if (classhome === "section-settings1") {
        setClasshome("section-settings2");
        setHomeTitle("Traduza músicas para o português");
      } else if (classhome === "section-settings2") {
        setClasshome("section-settings3");
        setHomeTitle("Aprenda línguas estrangeiras por meio de músicas");
      } else if (classhome === "section-settings3") {
        setClasshome("section-settings1");
        setHomeTitle("Ache seus song lyrics favoritos");
      }
      setCount((prevCount) => prevCount + 1);
    }, 15000);
    return () => {
      clearInterval(interval);
    };
  }, [classhome]);

  useEffect(() => {
    if (!Cookies.get("logged")) {
      Cookies.set("logged", "0");
    }

    if (Cookies.get("logged") && Cookies.get("logged") === "1") {
      window.location.reload();
    }
  }, []);

  const changeBackground = (number) => {
    if (number === 1) {
      setClasshome("section-settings1");
      setHomeTitle("Ache seus song lyrics favoritos");
    } else if (number === 2) {
      setClasshome("section-settings2");
      setHomeTitle("Traduza músicas para o português");
    } else if (number === 3) {
      setClasshome("section-settings3");
      setHomeTitle("Aprenda línguas estrangeiras por meio de músicas");
    }
  };

  const navigate = useNavigate();
  return (
    <>
      <section className={classhome}>
        <h1 className="margin-title font-sans text-4xl subpixel-antialiased font-semibold text-clip break-keep border-black italic">
          {homeTitle}
        </h1>
        <span className="display-loaders">
          <button className="home-button" onClick={() => navigate("/login")}>
            Entrar
          </button>
          <button className="home-button" onClick={() => navigate("sign-up")}>
            Cadastrar
          </button>
        </span>
        <span className="display-loaders">
          <button
            onClick={() => changeBackground(1)}
            className={
              classhome !== "section-settings2" &&
              classhome !== "section-settings3"
                ? "big-loader"
                : "small-loader"
            }
          ></button>
          <button
            onClick={() => changeBackground(2)}
            className={
              classhome !== "section-settings1" &&
              classhome !== "section-settings3"
                ? "big-loader"
                : "small-loader"
            }
          ></button>
          <button
            onClick={() => changeBackground(3)}
            className={
              classhome !== "section-settings1" &&
              classhome !== "section-settings2"
                ? "big-loader"
                : "small-loader"
            }
          ></button>
        </span>
      </section>
    </>
  );
}
