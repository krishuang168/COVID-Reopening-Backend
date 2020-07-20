const express = require("express");
const fs = require("fs");
const path = require("path");
const config = require("../config");
const frontendPath = path.join(__dirname, config.frontendPath);

const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  const homePage = fs.readFileSync(frontendPath + "index.html", "utf8");
  res.send(homePage);
});

/* Load CSS, JS & node_modules */
router.use("/css", express.static(frontendPath + "css"));
router.use("/js", express.static(frontendPath + "js"));
router.use("/node_modules", express.static(frontendPath + "node_modules"));

module.exports = router;
