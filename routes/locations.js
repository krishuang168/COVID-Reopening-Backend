const express = require("express");
const fs = require("fs");
const path = require("path");
const colors = require("colors");

/* Config & Routers */
const config = require("../config");
const frontendPath = path.join(__dirname, config.frontendPath);

const router = express.Router();

/* Display location.html */
router.get("/", (req, res, next) => {
  const page = fs.readFileSync(frontendPath + "locations.html", "utf8");
  res.send(page);
});

/* Submit by City */
router.post("/", (req, res, next) => {
  const city = req.body.city;
  console.log(city.black.bgCyan);

  const filePath = `${__dirname}/../public/data/cities/${req.body.city}WA.js`;

  /* Check file existence, async way */
  fs.access(filePath, fs.F_OK, (err) => {
    if (err) {
    //   console.error(err);
      return;
    }
    //file exists
  });

  try {
    const fileContent = fs.readFileSync(filePath);

    if (fileContent) {
      res.statusCode = 200;
      res.json(fileContent);
    }
  } catch (err) {
    res.statusCode = 404;
    err = new Error(`404 The data of the specified city is not found.`);
    res.json(err);
  }
});

module.exports = router;
