/* Import modules */
const express = require("express");
const fs = require("fs");
const path = require("path");
const passport = require("passport");
const authenticate = require("../authenticate");

/* Mongoose Model */
const User = require("../models/userModel");

/* Config */
const config = require("../config");
const frontendPath = path.join(__dirname, config.frontendPath);

/* Routers */
const router = express.Router();

/* Get user lists */
router.get("/", authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
  User.find()
    .then((users) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(users);
    })
    .catch((err) => next(err));
});

/* Serve the signup page */
router.get("/signup", (req, res) => {
  const page = fs.readFileSync(frontendPath + "signup.html", "utf8");
  res.statusCode = 200;
  res.send(page);
});

/* Register */
router.post("/signup", (req, res) => {
  User.register(new User({ username: req.body.username }), req.body.password, (err, user) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.json({ err: err });
    } else {
      if (req.body.firstname) {
        user.firstname = req.body.firstname;
      }
      if (req.body.lastname) {
        user.lastname = req.body.lastname;
      }
      user.save((err) => {
        if (err) {
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.json({ err: err });
          return;
        }
        passport.authenticate("local")(req, res, () => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json({ success: true, status: "Registration Successful!" });
        });
      });
    }
  });
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  const token = authenticate.getToken({ _id: req.user._id });

  console.log("***: " + JSON.stringify(Object.keys(req)));
  console.log("req.body: " + JSON.stringify(req.body));
  console.log("req.user: " + JSON.stringify(req.user));

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json(
    req.user.admin
      ? {
          success: true,
          token: token,
          status: "Welcome back, Admin!", // A different welcome message for Admin login
        }
      : {
          success: true,
          token: token,
          status: "You are successfully logged in!",
        }
  );
});

router.post("/", (req, res) => {
  const token = authenticate.getToken({ _id: req.user._id });

  console.log("***: " + JSON.stringify(Object.keys(req)));
  console.log("req.body: " + JSON.stringify(req.body));
  console.log("req.user: " + JSON.stringify(req.user));

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json(
    req.user.admin
      ? {
          success: true,
          token: token,
          status: "Welcome back, Admin!", // A different welcome message for Admin login
        }
      : {
          success: true,
          token: token,
          status: "You are successfully logged in!",
        }
  );
});

router.get("/logout", (req, res, next) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie("session-id");
    res.redirect("/");
  } else {
    const err = new Error("You are not logged in!");
    err.status = 401;
    return next(err);
  }
});

module.exports = router;

module.exports = router;
