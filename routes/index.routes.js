const express = require('express');
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/map", (req, res, next) => {

  res.render("map/map");
});

router.post("/map", (req, res, next) => {
  // ENTIENDO QUE AQUI HAY QUE AÑADIR LO QUE PILLAMOS DEL BUSCADOR
})

module.exports = router;
