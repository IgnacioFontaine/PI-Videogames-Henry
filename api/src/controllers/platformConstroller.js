const { Platform } = require("../db");
const { API_KEY } = process.env;
const axios = require("axios");

//Obtener plataformas
const getAllPlatforms = async () => {
  try {
    const apiResult = await axios.get(
      `https://api.rawg.io/api/platforms/lists/parents?key=${API_KEY}`
    );
    const apiVideogamesPlatforms = apiResult.data.results.map(
      (platform) => platform.name
    );
    return apiVideogamesPlatforms;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getAllPlatforms,
};
