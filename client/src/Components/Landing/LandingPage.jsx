import style from "./LandingPage.module.css";
import React from "react";
import { Link } from "react-router-dom";
import image from "../utils/game-control.png";

export default function LandingPage() {
  return (
    <div className={style.LandingPage}>
      <div className={style.divPapa}>
        <img className={style.logotipo} src={image} alt="Logo" />
        <h1>PI Videogames Proyect!</h1>
      </div>
      <div>
        <div className={style.text}>
          <h2>"Unlocking Adventures Beyond Reality"</h2>
        </div>
        <br />
        <h2 className={style.extraText}>Main Developer: Ignacio Fontaine</h2>
        <a
          className={style.extraText}
          href="https://www.linkedin.com/in/ignacio-fontaine/"
          target="_blank"
        >
          My Linkedin
        </a>
        <a
          className={style.extraText}
          href="https://github.com/IgnacioFontaine"
          target="_blank"
        >
          My GitHub
        </a>

        <br />
      </div>
      <div>
        <Link to={`/home`}>
          <button className={style.customButton}>START</button>
        </Link>
      </div>
    </div>
  );
}
