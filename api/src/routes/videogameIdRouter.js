//Router de Videogame ID
const { Router } = require("express");
const { videogameById } = require("../controllers/videogamesController");

const router = Router();

router.get("/:id", async (req, res) => {
  try {
    //Buscar y restornar el Videojuego de ID enviado por params
    const { id } = req.params;
    const response = await videogameById(id);
    return res.status(200).json(response);

    //Manejo error
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

module.exports = router;
