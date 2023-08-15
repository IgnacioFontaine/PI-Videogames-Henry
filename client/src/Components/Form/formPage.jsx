import { useDispatch } from "react-redux";
import style from "./form.module.css";
import React, { useEffect, useState } from "react";
import {
  createVideogame,
  getGenres,
  getAllPlatforms,
} from "../../Redux/actions";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default function Form() {
  //Obtener géneros para mapearlo en opciones
  const dispatch = useDispatch();
  //Plataformas
  const allPlatforms = useSelector((state) => state.platforms);

  useEffect(() => {
    dispatch(getGenres());
    dispatch(getAllPlatforms());
  }, [dispatch]);

  const allGenres = useSelector((state) => state.genres);

  //Estados para crear y validar formulario
  const [input, setInput] = useState({
    name: "",
    img: "",
    description: "",
    released: "",
    rating: "",
    genres: [],
    platforms: [],
  });

  const [error, setError] = useState({});

  function validate(input) {
    let error = {};
    //Validar nombre
    if (!input.name) {
      error.name = "Name required";
    } else if (!/^[a-zA-Z0-9-() .]+$/.test(input.name)) {
      error.name =
        "Only letters, numbers, hyphens, and parentheses are accepteds";
    }
    //Validar imagen
    // if (
    // new RegExp(/^(ftp|http|https)://[^ "]+$/)
    //   input.img.length !== 0 &&
    //   !/^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/.test(input.image)
    // ) {
    //   error.img = "invalid URL";
    // }

    if (!input.img) {
      error.img = "Image required";
    }

    if (!input.description) {
      error.description = "Description required";
    } else if (input.description.length > 100) {
      error.description =
        "The description must have a maximum of 100 characters";
    }

    if (!input.released) {
      error.released = "Release date required";
    }

    if (!input.rating) {
      error.rating = "Rating required";
    } else if (input.rating > 5) {
      error.rating = "The rating should not be higher than 5";
    } else if (input.rating <= 0) {
      error.rating = "The rating must not be less than or equal to 0";
    }

    if (!input.genres) {
      error.genres = "Genre required";
    }

    if (!input.platforms) {
      error.platforms = "Platform required";
    }

    return error;
  }

  //Errores:
  let errors = Object.keys(validate(input));

  function handleChange(event) {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
    setError(
      validate({
        ...input,
        [event.target.name]: event.target.value,
      })
    );
  }

  //Enviar Videojuego correcto a DB:
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(input);
    dispatch(createVideogame(input));
    alert(`Videojuego ${input.name} creado con éxito`);
    setInput({
      name: "",
      description: "",
      released: "",
      rating: "",
      img: "",
      platforms: [],
      genres: [],
    });
  };

  //Manejo handler de Generos:
  const handleGenresChange = (event) => {
    const genre = event.target.value;
    if (event.target.checked) {
      setInput((state) => ({
        ...state,
        genres: [...state.genres, genre],
      }));
    } else {
      setInput((state) => ({
        ...state,
        genres: state.genres.filter((g) => g !== genre),
      }));
    }
  };

  //Manejo handler de Plataformas:
  const handlePlatformsChange = (event) => {
    const platform = event.target.value;
    if (event.target.checked) {
      setInput((state) => ({
        ...state,
        platforms: [...state.platforms, platform],
      }));
    } else {
      setInput((state) => ({
        ...state,
        platforms: state.platforms.filter((plat) => plat !== platform),
      }));
    }
  };

  //No permite enviar un form con errores
  const handleNotSubmit = (event) => {
    event.preventDefault();
    alert("Complete the request!");
  };

  return (
    <div>
      <form className={style.formPage} onSubmit={handleSubmit}>
        <div className={style.formulario}>
          <div>
            <h1 className={style.importantText}>Create your VideoGame🎮</h1>
            <br />
          </div>
          <div>
            {/*------------------------------Name------------------------------*/}
            <div className={style.elementos}>
              <label htmlFor="name" className={style.labelText}>
                Name:
              </label>
              <input
                className={style.imputs}
                name="name"
                value={input.name}
                onChange={handleChange}
                autoComplete="off"
              ></input>
              {error.name && (
                <span className={style.labelText}>{error.name}</span>
              )}
            </div>

            {/*------------------------------Img------------------------------*/}
            <div className={style.elementos}>
              <label htmlFor="img" className={style.labelText}>
                Image:
              </label>
              <input
                className={style.imputs}
                name="img"
                value={input.img}
                onChange={handleChange}
                autoComplete="off"
              ></input>
              {error.img && (
                <span className={style.labelText}>{error.img}</span>
              )}
            </div>

            {/*------------------------------Description------------------------------*/}
            <div className={style.elementos}>
              <label htmlFor="description" className={style.labelText}>
                Description:
              </label>
              <textarea
                className={style.textArea}
                name="description"
                value={input.description}
                onChange={handleChange}
                autoComplete="off"
              ></textarea>
              {error.description && (
                <span className={style.labelText}>{error.description}</span>
              )}
            </div>

            {/*------------------------------Platforms------------------------------*/}
            <div className={style.elementos}>
              <label htmlFor="platforms" className={style.labelText}>
                Platforms:
              </label>
              <div className={style.checkBoxPlatforms}>
                {allPlatforms &&
                  allPlatforms.map((platform) => {
                    return (
                      <div>
                        <label
                          className={style.inputCheckBoxPlatforms}
                          htmlFor="platforms"
                          name={platform.name}
                          id={platform.name}
                        >
                          {platform}
                        </label>
                        <input
                          value={platform}
                          className={style.inputCheckBox}
                          type="checkbox"
                          name={platform.name}
                          onChange={handlePlatformsChange}
                        ></input>
                      </div>
                    );
                  })}
              </div>
              {error.platforms && (
                <span className={style.labelText}>{error.platforms}</span>
              )}
            </div>
          </div>
          <div>
            {/*------------------------------Release date------------------------------*/}
            <div className={style.elementos}>
              <label htmlFor="released" className={style.labelText}>
                Release date:
              </label>
              <input
                className={style.imputs}
                name="released"
                value={input.released}
                onChange={handleChange}
                autoComplete="off"
              ></input>
              {error.released && (
                <span className={style.labelText}>{error.released}</span>
              )}
            </div>

            {/*------------------------------Rating------------------------------*/}
            <div className={style.elementos}>
              <label htmlFor="rating" className={style.labelText}>
                Rating:
              </label>
              <input
                className={style.imputs}
                name="rating"
                value={input.rating}
                onChange={handleChange}
                autoComplete="off"
              />
              {error.rating && (
                <span className={style.labelText}>{error.rating}</span>
              )}
            </div>

            {/*------------------------------Genres------------------------------*/}
            <div className={style.elementos}>
              <label htmlFor="genres" className={style.labelText}>
                Genres:
              </label>
              <div className={style.checkBox}>
                {allGenres &&
                  allGenres.map((genre) => {
                    return (
                      <div>
                        <label htmlFor="genres" name={genre.name} id={genre.id}>
                          {genre.name}
                        </label>
                        <input
                          value={genre.name}
                          className={style.inputCheckBox}
                          type="checkbox"
                          name={genre.name}
                          onChange={handleGenresChange}
                        ></input>
                      </div>
                    );
                  })}
              </div>
              {error.genres && (
                <span className={style.labelText}>{error.genres}</span>
              )}
            </div>
          </div>
          <div>
            {/*------------------------------Create------------------------------*/}
            <div>
              {errors.length === 0 ? (
                <button className={style.customButton} type="submit">
                  Create✅
                </button>
              ) : (
                <button
                  className={style.customButtonFalse}
                  type="notSubmit"
                  onClick={handleNotSubmit}
                >
                  Complete Fields❌
                </button>
              )}
              <Link to="/home">
                <button className={style.customButton}>Back to Home</button>
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
