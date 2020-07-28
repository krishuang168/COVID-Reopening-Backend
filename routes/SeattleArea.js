const express = require("express");
const fs = require("fs");
const colors = require("colors");
const path = require("path");
const readContent = require("../readContent");

/* Config & Routers */
const config = require("../config");
const frontendPath = path.join(__dirname, config.frontendPath);
const router = express.Router();

/* Display Seattle Metropolitan Area */
router.get("/", (req, res, next) => {
  const page = fs.readFileSync(frontendPath + "locations/SeattleArea.html", "utf8");
  res.send(page);
});

/* Fetch restaurants using static JSON files */
router.get("/*", (req, res, next) => {
  const reqPath = req.path;
  const resPath = `${__dirname}/../public/data/SeattleArea${reqPath}.json`;
  console.log(resPath.white.bgBlue);

  const content = readContent(resPath).toString();
  if (content !== "Error: Data Not Found") {
    res.statusCode = 200;
    res.json(content);
  } else {
    res.statusCode = 404;
    res.json(content);
  }
});

module.exports = router;
