const express = require("express");
const fs = require("fs");
const path = require("path");
const colors = require("colors");

/* Config & Routers */
const config = require("../config");
const frontendPath = path.join(__dirname, config.frontendPath);
const SeattleAreaRouter = require("./SeattleArea");

const router = express.Router();

/* Display location.html */
router.get("/", (req, res, next) => {
  const page = fs.readFileSync(frontendPath + "locations.html", "utf8");
  res.send(page);
});

router.use("/SeattleArea", SeattleAreaRouter);

/* HTML Form */
router.post("/", (req, res, next) => {
  const city = req.body.city;
  console.log(city.black.bgCyan);

  const filePath = `${__dirname}/../public/data/cities/${req.body.city}WA.json`;

  /* Check file existence, async way */
  fs.access(filePath, fs.F_OK, (err) => {
    if (err) {
      return;
    }
    //file exists
  });

  try {
    const fileContent = Buffer.from(fs.readFileSync(filePath), "base64");
    console.log("After Buffer: " + fileContent);

    if (fileContent) {
      res.statusCode = 200;
      res.send(`<body>${fileContent}</body>`);
    }
  } catch (err) {
    res.statusCode = 404;
    err = new Error(`404 The data of the specified city is not found.`);
    res.json(err);
  }
});

module.exports = router;
