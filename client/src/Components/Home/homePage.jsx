import style from "./home.module.css";
import React, { useState } from "react";
import NavBar from "../NavBar/navBar";
import Paginado from "../Pagin/pagin";
import Cards from "../Cards/cards";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getVideogames,
  getVideogamesByName,
  getVideogamesByAlp,
  getVideogamesByRate,
  getByGenre,
  getDbGames,
} from "../../Redux/actions";

export default function Home() {
  //Traer todos los Videojuegos al ingresar al Home
  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.sortVideogames);

  useEffect(() => {
    dispatch(getVideogames());
  }, [dispatch]);

  //Funciones para buscar en la NavBar
  const [searchName, setSearchName] = useState("");

  function handleChange(event) {
    event.preventDefault();
    setSearchName(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(getVideogamesByName(searchName));
  }

  //Paginado
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage] = useState(15);
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = allVideogames.slice(indexOfFirstGame, indexOfLastGame);
  //Cambio de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleNextPage = (event) => {
    event.preventDefault();
    if (currentPage < indexOfLastGame) {
      setCurrentPage(currentPage + 1);
    }
    return;
  };
  const handlePrevPage = (event) => {
    event.preventDefault();
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
    return;
  };

  //Filtrado
  const handleSort = (event) => {
    event.preventDefault();
    if (event.target.value === "") {
      dispatch(getVideogames());
    } else if (event.target.value === "asc" || event.target.value === "desc") {
      dispatch(getVideogamesByAlp(event.target.value));
    } else {
      dispatch(getVideogamesByRate(event.target.value));
    }
  };

  const handleFilter = (event) => {
    event.preventDefault();
    if (event.target.value === "") {
      dispatch(getVideogames());
    } else {
      dispatch(getByGenre(event.target.value));
    }
  };

  const handleOrigin = (event) => {
    event.preventDefault();
    if (event.target.value === "") {
      dispatch(getVideogames());
    } else {
      dispatch(getDbGames(event.target.value));
    }
  };

  return (
    <div className={style.homePage}>
      <header>
        <div>
          <div>
            <NavBar
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              handleSort={handleSort}
              handleFilter={handleFilter}
              handleOrigin={handleOrigin}
            />
          </div>
          <hr />
          <br />
        </div>
      </header>
      <body>
        <div>
          <Cards videogames={currentGames} />
        </div>
        <div>
          <h3 className={style.currentPage}>Current Page:{currentPage}</h3>
          <Paginado
            className={style.paggin}
            gamesPerPage={gamesPerPage}
            totalGames={allVideogames.length}
            paginate={paginate}
            handleNextPage={handleNextPage}
            handlePrevPage={handlePrevPage}
          />
        </div>
      </body>
    </div>
  );
}
