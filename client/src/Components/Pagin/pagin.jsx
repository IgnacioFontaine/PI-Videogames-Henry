import React from "react";
import style from "./pagin.module.css";

const Paginado = ({
  gamesPerPage,
  totalGames,
  paginate,
  handlePrevPage,
  handleNextPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalGames / gamesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className={style.paginNav}>
      <button className={style.customButton} onClick={handlePrevPage}>
        Prev
      </button>
      <ul className={style.paginUl}>
        {pageNumbers.map((number) => (
          <li key={number} className={style.paginLi}>
            <a
              onClick={(event) => {
                event.preventDefault();
                paginate(number);
              }}
              href="/home"
              className={style.paginA}
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
      <button className={style.customButton} onClick={handleNextPage}>
        Next
      </button>
    </nav>
  );
};

export default Paginado;
