import React from "react";
import Card from "../Card/card";
import style from "./cards.module.css";

const Cards = ({ videogames }) => {
  const videogameList = videogames;
  return (
    <div className={style.contenedor}>
      {videogameList && videogameList.map((game) => <Card game={game} />)}
    </div>
  );
};

export default Cards;
