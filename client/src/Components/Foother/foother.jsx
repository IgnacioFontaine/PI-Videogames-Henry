import React from "react";
import style from "../Foother/foother.module.css";

const Foother = () => {
  return (
    <div className={style.contenedor}>
      <div className={style.elementos}>
        <h1 className={style.inputs}>All rights reserved ©</h1>
      </div>
      <div className={style.elementos}>
        <h2 className={style.inputs}>Created by Ignacio Fontaine</h2>
      </div>
      <div>
        <h2 className={style.inputs}>Henry FT40a</h2>
      </div>
    </div>
  );
};

export default Foother;
