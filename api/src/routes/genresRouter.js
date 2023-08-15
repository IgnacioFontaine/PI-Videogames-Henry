//Router de Generos
const { Router } = require("express");
const { getGenres } = require("../controllers/genresController");

const router = Router();

router.get("/", async (req, res) => {
  try {
    //Obtener generos
    const genres = await getGenres();
    res.status(200).json(genres);

    //Manejo error
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
