import {
  GET_ALL_VIDEOGAMES,
  SEARCH_BY_NAME,
  GET_ALL_GENRES,
  CREATE_GAME,
  ERROR,
  GET_BY_DB,
  GET_BY_ALP,
  GET_BY_RATING,
  GET_BY_GENRE,
  SEARCH_BY_ID,
  GET_PLATFORMS,
} from "./actions";

//Config initialState
const initialState = {
  videogames: [],
  sortVideogames: [],
  detail: [],
  genres: [],
  error: false,
  errormsg: {},
  platforms: [],
};

//Config reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_VIDEOGAMES:
      const all_games = [...action.payload];
      return {
        ...state,
        videoGames: action.payload,
        sortVideogames: all_games,
      };
    case SEARCH_BY_ID:
      return {
        ...state,
        detail: action.payload,
      };
    case GET_ALL_GENRES:
      return {
        ...state,
        genres: action.payload,
      };
    case SEARCH_BY_NAME:
      return {
        ...state,
        sortVideogames: action.payload,
      };
    case CREATE_GAME:
      if (action.payload.status === 200) {
        return {
          ...state,
          errormsg: {},
        };
      } else {
        return {
          ...state,
          errormsg: action.payload,
        };
      }
    case ERROR:
      return {
        ...state,
        error: true,
      };
    case GET_BY_DB:
      const dbOApi =
        action.payload === "db"
          ? state.videoGames.filter((game) => game.id.toString().includes("-"))
          : action.payload === "api"
          ? state.videoGames.filter((game) => !game.id.toString().includes("-"))
          : [...state.videoGames];
      return {
        ...state,
        sortVideogames: dbOApi,
      };
    case GET_BY_ALP:
      const sortByAlp =
        action.payload === "asc"
          ? state.sortVideogames.sort((a, b) => {
              if (a.name > b.name) return 1;
              if (a.name < b.name) return -1;
              return 0;
            })
          : action.payload === "desc"
          ? state.sortVideogames.sort((a, b) => {
              if (a.name > b.name) return -1;
              if (a.name < b.name) return 1;
              return 0;
            })
          : [...state.sortVideogames];
      return {
        ...state,
        sortVideogames: sortByAlp,
      };
    case GET_BY_RATING:
      const gamesSorted =
        action.payload === "higer"
          ? state.sortVideogames.sort((a, b) => b.rating - a.rating)
          : action.payload === "lower"
          ? state.sortVideogames.sort((a, b) => a.rating - b.rating)
          : [...state.sortVideogames];
      return {
        ...state,
        sortVideogames: gamesSorted,
      };
    case GET_BY_GENRE:
      let gamesFilt = state.sortVideogames.filter((game) =>
        game.genres.includes(action.payload)
      );
      let err = !gamesFilt.length;
      return {
        ...state,
        sortVideogames: gamesFilt,
        error: err ? !state.error : state.error,
      };

    case GET_PLATFORMS:
      return {
        ...state,
        platforms: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
