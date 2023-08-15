//Router de Videogame ID
const { Router } = require("express");
const { getAllPlatforms } = require("../controllers/platformConstroller");

const router = Router();

router.get("/", async (req, res) => {
  try {
    //Obtener plataformas
    const platforms = await getAllPlatforms();
    res.status(200).json(platforms);

    //Manejo error
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
