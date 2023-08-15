//Router de Videogames
const { Router } = require("express");
const {
  getVideogames,
  videogameByName,
  createVideogameDB,
} = require("../controllers/videogamesController");
const { Genre } = require("../db");
// const { getGenres } = require("../controllers/genresController");

const router = Router();

//Rutas Videogames
//Obtener Videogames
router.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    let videogames;
    if (name) {
      //Si existe nombre, buscarlo
      videogames = await videogameByName(name);
      return res.status(200).json(videogames);
    } else {
      //Si no se manda un nombre, buscar todos
      videogames = await getVideogames();
      return res.status(200).json(videogames);
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

//Crear Videogame
router.post("/", async (req, res) => {
  try {
    const { name, description, platforms, released, rating, img, genres } =
      req.body;

    //Crearlo
    const newVideogame = await createVideogameDB(
      name,
      description,
      platforms,
      released,
      rating,
      img
    );
    let genresDB = await Genre.findAll({
      where: {
        name: genres,
      },
    });

    newVideogame.addGenre(genresDB);
    //Retornarlo
    res.status(200).json(newVideogame);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

module.exports = router;
