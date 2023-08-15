import React from "react";
import image from "../utils/game-control.png";
import style from "../Loading/loading.module.css";

const Loading = () => {
  return (
    <div className={style.contenedorLoading}>
      <div>
        <img src={image}></img>
      </div>
      <div>
        <h1>LOADING...</h1>
      </div>
    </div>
  );
};

export default Loading;
