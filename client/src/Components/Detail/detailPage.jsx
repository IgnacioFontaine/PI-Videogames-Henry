import style from "./detail.module.css";
import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getVideogameByID } from "../../Redux/actions";

export default function Detail() {
  //Obtener id y montar componente
  const { id } = useParams();
  const dispatch = useDispatch();

  //Simular montaje componente
  useEffect(() => {
    dispatch(getVideogameByID(id));
  }, [dispatch, id]);

  const videogameById = useSelector((state) => state.detail);
  console.log(videogameById);

  return (
    <div className={style.allDetail}>
      <div className={style.detailContainer}>
        <div>
          <div>
            <img
              alt={videogameById.name}
              src={videogameById.img && videogameById.img}
              width="500px"
              heigth="300px"
              className={style.detailImage}
            ></img>
          </div>
          <div>
            <h1 className={style.detailTitle}>
              {videogameById.name && videogameById.name}
            </h1>
            <h2 className={style.detailPlatforms}>
              ID: {videogameById.id && videogameById.id}
            </h2>
            <h2 className={style.detailPlatforms}>
              {videogameById.plataforms && videogameById.plataforms}
            </h2>
            <h2 className={style.detailDescription}>
              {videogameById.description ? videogameById.description : null}
            </h2>
            <h2>{videogameById.released && videogameById.released}</h2>
            <h2 className={style.detailRating}>
              {videogameById.rating && videogameById.rating}
            </h2>
            <h2 className={style.detailGenres}>
              {videogameById.genres &&
                videogameById.genres.map((genre) => <h3>{genre}</h3>)}
            </h2>
          </div>
        </div>
        <div>
          <Link to="/home">
            <button className={style.customButton}>Home</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
