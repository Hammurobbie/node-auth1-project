const express = require("express");

const server = express();

server.use(express.json());

//move this to other files eventually vv

const bcrypt = require("bcryptjs");

const password = "123";

const hash = bcrypt.hashSync(password, 12);

const restrict = require("./auth/restricted-middleware");

// move this ^^

server.use("/", (req, res) => {
  res.send("Auth API");
});

module.exports = server;
