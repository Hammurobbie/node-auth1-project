const express = require("express");

const users = require("./users-model");

const router = express.Router();

const bcrypt = require("bcryptjs");

const restricted = require("../auth/restricted-middleware");

router.get("/users", restricted, (req, res) => {
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
        ? res.status(200).json({ message: `Welcome, ${user.username}!` })
        : res.status(401).json({ message: `Invlaid user credientials` });
    })
    .catch(err => {
      console.log(err.message);
      res.status(401).json({ message: "Unable to retrieve user" });
    });
});

module.exports = router;
