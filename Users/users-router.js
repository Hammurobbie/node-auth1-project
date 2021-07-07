const express = require("express");

const users = require("./users-model");

const router = express.Router();

const bcrypt = require("bcryptjs");

const restricted = require("../auth/restricted-middleware");

router.get("/users", restricted, (req, res) => {
  console.log(req.session);
  users
    .find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(() => {
      res.status(401).json({ message: "Unable to retrieve users" });
    });
});

router.post("/register", (req, res) => {
  const hash = bcrypt.hashSync(req.body.password, 12);

  req.body.password = hash;

  users
    .register(req.body)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      console.log(err.message);
      res.status(401).json({ message: "Unable to create user" });
    });
});

router.post("/login", (req, res) => {
  users
    .findBy(req.body.username)
    .first()
    .then(user => {
      user && bcrypt.compareSync(req.body.password, user.password)
        ? (req.session.user = req.body.username) &&
          res.send(`Welcome, ${req.body.username}`) &&
          console.log(req.session)
        : res.status(401).json({ message: `Invlaid user credientials` });
    })
    .catch(err => {
      console.log(err.message);
      res.status(401).json({ message: "Unable to retrieve user" });
    });
});

router.get("/logout", (req, res) => {
  req.session
    ? req.session.destroy(err => {
        err
          ? res.send("error logging out")
          : res.send("You've been logged out");
      })
    : res.send("session does not exist");
});

module.exports = router;
