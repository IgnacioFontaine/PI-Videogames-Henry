import style from "./LandingPage.module.css";
import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className={style.LandingPage}>
      <div>
        <h1 className={style.customText}>
          PI Videogames Proyect!
          <br />
        </h1>
      </div>
      <div>
        {/* <p>
          Application that shows videogames, their detail and it is possible to
          create your own videogame! To start press the button
        </p> */}
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
