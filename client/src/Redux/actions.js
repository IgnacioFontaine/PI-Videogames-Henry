import axios from "axios";

//Generamos constantes para evitar errores de tipeo
export const GET_ALL_VIDEOGAMES = "GET_ALL_VIDEOGAMES";
export const ERROR = "ERROR";
export const SEARCH_BY_NAME = "SEARCH_BY_NAME";
export const GET_ALL_GENRES = "GET_ALL_GENRES";
export const GET_BY_DB = "GET_BY_DB";
export const CREATE_GAME = "CREATE_GAME";
export const GET_BY_RATING = "GET_BY_RATING";
export const GET_BY_ALP = "GET_BY_ALP";
export const GET_BY_GENRE = "GET_BY_GENRE";
export const SEARCH_BY_ID = "SEARCH_BY_ID";
export const GET_PLATFORMS = "GET_PLATFORMS";

//Actions:
export const getVideogames = () => async (dispatch) => {
  try {
    let result = await axios.get("http://localhost:3001/videogames");
    return dispatch({ type: GET_ALL_VIDEOGAMES, payload: result.data });
  } catch (error) {
    return dispatch({ type: ERROR, payload: error });
  }
};

export const getVideogamesByName = (name) => async (dispatch) => {
  try {
    let result = await axios.get(
      `http://localhost:3001/videogames?name=${name}`
    );
    return dispatch({ type: SEARCH_BY_NAME, payload: result.data });
  } catch (error) {
    return dispatch({ type: ERROR, payload: error });
  }
};

export const getVideogameByID = (id) => async (dispatch) => {
  try {
    let result = await axios.get(`http://localhost:3001/videogame/${id}`);
    return dispatch({ type: SEARCH_BY_ID, payload: result.data });
  } catch (error) {
    return dispatch({ type: ERROR, payload: error });
  }
};

export const getGenres = () => async (dispatch) => {
  let result = await axios.get("http://localhost:3001/genres");
  return dispatch({ type: GET_ALL_GENRES, payload: result.data });
};

export const getDbGames = (value) => (dispatch) => {
  return dispatch({ type: GET_BY_DB, payload: value });
};

export const createVideogame = (game) => async (dispatch) => {
  const newGame = await axios.post("http://localhost:3001/videogames", game);
  return dispatch({ type: CREATE_GAME, payload: newGame.data });
};

export const getVideogamesByRate = (rate) => (dispatch) => {
  return dispatch({ type: GET_BY_RATING, payload: rate });
};

export const getVideogamesByAlp = (alp) => (dispatch) => {
  return dispatch({ type: GET_BY_ALP, payload: alp });
};

export const getByGenre = (genre) => (dispatch) => {
  try {
    return dispatch({ type: GET_BY_GENRE, payload: genre });
  } catch (error) {
    return dispatch({ type: ERROR, payload: error });
  }
};

export const getPlatforms = (platforms) => (dispatch) => {
  return dispatch({ type: GET_PLATFORMS, payload: platforms });
};
