const express = require("express");
const fs = require("fs");
const colors = require("colors");
const path = require("path");
const config = require("../config");
const frontendPath = path.join(__dirname, config.frontendPath);

const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  try {
    const page = fs.readFileSync(frontendPath + "index.html", "utf8");
    res.statusCode = 200;
    res.send(page);
  } catch (err) {
    res.statusCode = 404;
    res.end(`
    <h1 style="color: #995500;
    text-shadow: 2px 2px #c99f4a;
    font-size: 3.2em;
    font-family: "Tangerine", sans-serif;">Coming Soon</h1>
    `);
  }
});

/* Load CSS, JS & node_modules */
router.use("/css", express.static(frontendPath + "css"));
router.use("/js", express.static(frontendPath + "js"));
router.use("/images", express.static(frontendPath + "images"));
router.use("/favicon.ico", express.static(frontendPath + "favicon_io/favicon.ico"));
router.use("/node_modules", express.static(frontendPath + "node_modules"));

/* By Category */
router.get("/categories", function (req, res, next) {
  try {
    const page = fs.readFileSync(frontendPath + "categories.html", "utf8");
    res.statusCode = 200;
    res.send(page);
  } catch (err) {
    res.statusCode = 404;
    res.end(`
    <h1 style="color: #995500;
    text-shadow: 2px 2px #c99f4a;
    font-size: 3.2em;
    font-family: "Tangerine", sans-serif;">Coming Soon</h1>
    `);
  }
});

/* Photo Credits */
router.get("/photo_credits", (req, res, next) => {
  const page = fs.readFileSync(frontendPath + "photo_credits.html", "utf8");
  res.send(page);
});

module.exports = router;
