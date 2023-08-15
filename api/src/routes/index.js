const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const videoGamesRouter = require("./videogamesRouter.js");
const videoGameIdRoute = require("./videogameIdRouter");
const genresRouter = require("./genresRouter.js");

//Ruter:
const router = Router();

// Configurar los routers
router.use("/videogames", videoGamesRouter);
router.use("/videogame", videoGameIdRoute);
router.use("/genres", genresRouter);

module.exports = router;
