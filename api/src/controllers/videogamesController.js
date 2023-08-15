const { Videogame, Genre } = require("../db");
const { Op } = require("sequelize");
const { API_KEY } = process.env;
const axios = require("axios");

const getVideogames = async () => {
  try {
    //Videojuegos en la API
    let apiurls = [];
    for (let i = 1; i <= 5; i++) {
      apiurls = [
        ...apiurls,
        `https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`,
      ];
    }
    let apiVideogames = apiurls.map((url) => axios.get(url));
    apiVideogames = await Promise.all(apiVideogames);
    apiVideogames = apiVideogames
      ?.map((response) => response.data.results)
      .flat();
    apiVideogames = apiVideogames?.map((game) => {
      return {
        id: game.id,
        name: game.name,
        genres: game.genres?.map((gen) => gen.name),
        platforms: game.platforms?.map((plat) => plat.platform.name),
        released: game.released,
        img: game.background_image,
        rating: game.rating,
      };
    });
    //Los videojuegos en la base de datos
    let videogamesInDB = await Videogame.findAll({
      include: {
        model: Genre,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    videogamesInDB = videogamesInDB?.map((game) => {
      return {
        id: game.id,
        name: game.name,
        genres: game.genres?.map((gen) => gen.name),
        platforms: game.platforms,
        released: game.released,
        img: game.img,
        rating: game.rating,
        description: game.description,
      };
    });
    //Luego de oobtener los juegos de la API y DB, retornarlos:
    return [...apiVideogames, ...videogamesInDB];
  } catch (error) {
    throw new Error("Cannot get the games");
  }
};

const videogameByName = async (name) => {
  try {
    let foundGame = [];
    //Búsuqeda en la API
    let api = await axios.get(
      `https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`
    );
    api = api.data.results;
    if (api.length) {
      api = api.splice(0, 15);

      api = api?.map((game) => {
        return {
          id: game.id,
          name: game.name,
          genres: game.genres?.map((gen) => gen.name),
          platforms: game.platfoms?.map((plat) => plat.platform.name),
          released: game.released,
          img: game.background_image,
          rating: game.rating,
          description: game.description,
        };
      });
    }
    //Búsqueda en la DB
    let results = await Videogame.findAll({
      where: {
        //Busca los nombres similares a lo enviado en "name"
        name: { [Op.iLike]: `%${name}%` },
      },
      include: {
        model: Genre,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    if (results.length) {
      results = results.map((game) => {
        return {
          id: game.id,
          name: game.name,
          genres: game.genres?.map((gen) => gen.name),
          platforms: game.platfoms,
          released: game.released,
          img: game.background_image,
          rating: game.rating,
          description: game.description,
        };
      });
    }

    foundGame = [...api, ...results];

    //Si found Game no tiene nada, no encontró el juego
    if (foundGame.length == 0)
      throw new Error("No fue posible encontrar el Videojuego");
    return foundGame;
  } catch (error) {
    throw new Error(error);
  }
};

const videogameById = async (id) => {
  try {
    if (id.includes("-")) {
      let db = await Videogame.findOne({
        where: { id: id },
        include: [Genre],
      });

      const gameDB = {
        id: db.dataValues.id,
        name: db.dataValues.name,
        genres: db.dataValues.genres?.map((gen) => gen.name),
        platforms: db.dataValues.platforms,
        released: db.dataValues.released,
        img: db.dataValues.img,
        rating: db.dataValues.rating,
        description: db.dataValues.description,
      };

      return gameDB;
    } else {
      let apigame = await axios.get(
        `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
      );
      apigame = apigame.data;
      const gamefind = {
        id: apigame.id,
        name: apigame.name,
        genres: apigame.genres?.map((gen) => gen.name),
        platforms: apigame.platforms?.map((plat) => plat.platform.name),
        released: apigame.released,
        img: apigame.background_image,
        rating: apigame.rating,
        description: apigame.description,
      };
      return gamefind;
      //Al encontrar el Videojuego en la API o en la BD, retornarlo
    }
  } catch (error) {
    //De no encontrarlo, restornar al Usuario el ID del juego inexistente
    if (error == "AxiosError: Request failed with status code 404")
      throw new Error(`El Videojuego con id: ${id}, no existe.`);
    throw new Error(error);
  }
};

const createVideogameDB = async (
  name,
  description,
  platforms,
  released,
  rating,
  img
) => {
  try {
    let newVideogame = await Videogame.create({
      name,
      description,
      platforms,
      released,
      rating,
      img,
    });
    return newVideogame;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getVideogames,
  videogameByName,
  videogameById,
  createVideogameDB,
};
