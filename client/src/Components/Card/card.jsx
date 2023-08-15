import React from "react";
import style from "./card.module.css";
import { Link } from "react-router-dom";

const Card = ({ game }) => {
  const { id, name, img, plataforms, description, released, rating, genres } =
    game;

  return (
    <div className={style.card} key={id}>
      <Link to={`/detail/${id}`}>
        <img src={img ? img : null} alt={name} />
        <h1>{name ? name : null}</h1>
        <h2>{plataforms ? plataforms : null}</h2>
        <h2>{description ? description : null}</h2>
        <h2>{released ? released : null}</h2>
        <h2>{rating ? rating : null}</h2>
        <h2>{genres ? genres : null}</h2>
      </Link>
    </div>
  );
};

export default Card;
