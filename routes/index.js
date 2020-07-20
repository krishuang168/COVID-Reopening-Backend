const express = require("express");
const fs = require("fs");
const router = express.Router();

const frontend = `${__dirname}/../../../html-website/`;

/* GET home page. */
router.get("/", function (req, res, next) {
  // res.render('index', { title: 'Express' });
  const homePage = fs.readFileSync(
    "../../html-website/public/index.html",
    "utf8"
  );
  console.log(frontend);
  res.send(homePage);
});

/* Load CSS */
router.use("/css", express.static("../../html-website/public/css"));

module.exports = router;
