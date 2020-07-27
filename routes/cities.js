const express = require("express");
const fs = require("fs");
const colors = require("colors");
const path = require("path");
const config = require("../config");
const readContent = require("../readContent");

const router = express.Router();

/* For Fetch API */
router.get("/*", (req, res, next) => {
  const reqPath = req.path;
  const resPath = `${__dirname}/../public/data/cities${reqPath}.json`;
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
