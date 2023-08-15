import React from "react";
import style from "./navBar.module.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres } from "../../Redux/actions";

const NavVar = ({
  handleChange,
  handleSubmit,
  handleFilter,
  handleSort,
  handleOrigin,
}) => {
  const dispatch = useDispatch();
  const allGenres = useSelector((state) => state.genres);

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  return (
    <div>
      <form onChange={handleChange} className={style.navbar}>
        <input
          placeholder="Search for name..."
          type="search"
          className={style.searchInput}
        ></input>
        <button
          type="submit"
          onClick={handleSubmit}
          className={style.searchButton}
        >
          Search
        </button>

        <select
          onChange={(event) => handleSort(event)}
          className={style.searchButton}
        >
          <option value="">Order:</option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
          <option value="higer">Rating &#8648;</option>
          <option value="lower">Rating &#8650;</option>
        </select>

        <select
          id="genre"
          onChange={(e) => handleFilter(e)}
          className={style.searchButton}
        >
          <option value="">Genres</option>
          {allGenres &&
            allGenres.map((genre) => {
              return (
                <option key={genre.id} value={genre.name}>
                  {genre.name}
                </option>
              );
            })}
        </select>

        <select
          onChange={(event) => handleOrigin(event)}
          className={style.searchButton}
        >
          <option value="">Origin</option>
          <option value="api">API</option>
          <option value="db">Created</option>
        </select>

        <Link to="/form">
          <button className={style.searchButton}>Create Game</button>
        </Link>
      </form>
    </div>
  );
};

export default NavVar;
