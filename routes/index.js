const express = require("express");
const fs = require("fs");
const router = express.Router();

const frontendPath = `${__dirname}/../../../html-website/`;

/* GET home page. */
router.get("/", function (req, res, next) {
  // res.render('index', { title: 'Express' });
  const homePage = fs.readFileSync(frontendPath + "public/index.html", "utf8");
  console.log(frontendPath);
  res.send(homePage);
});

/* Load CSS */
router.use("/css", express.static(frontendPath + "public/css"));

module.exports = router;
