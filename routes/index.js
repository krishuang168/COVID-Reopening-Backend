const express = require("express");
const fs = require("fs");
const path = require("path");
const config = require("../config");
const frontendPath = path.join(__dirname, config.frontendPath);

const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  const page = fs.readFileSync(frontendPath + "index.html", "utf8");
  res.send(page);
});

/* Load CSS, JS & node_modules */
router.use("/css", express.static(frontendPath + "css"));
router.use("/js", express.static(frontendPath + "js"));
router.use("/node_modules", express.static(frontendPath + "node_modules"));

/* By Location */
router.get("/locations", function (req, res, next) {
  const page = fs.readFileSync(frontendPath + "locations.html", "utf8");
  res.send(page);
});

/* By Category */
router.get("/categories", function (req, res, next) {
  const page = fs.readFileSync(frontendPath + "categories.html", "utf8");
  res.send(page);
});

/* Photo Credits */
router.get("/photo_credits", function (req, res, next) {
  const page = fs.readFileSync(frontendPath + "photo_credits.html", "utf8");
  res.send(page);
});

module.exports = router;
