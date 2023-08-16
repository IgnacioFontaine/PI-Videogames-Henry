import React from "react";
import image from "../utils/game-control.png";
import style from "../Loading/loading.module.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Loading = () => {
  return (
    <div className={style.contenedorLoading}>
      <div>
        <img src={image}></img>
      </div>
      <div>
        <h1>LOADING...</h1>
        <h2>If this don't change, return:</h2>
      </div>
      <div>
        <Link to="/home">
          <button className={style.searchButton}>Home</button>
        </Link>
      </div>
    </div>
  );
};

export default Loading;
