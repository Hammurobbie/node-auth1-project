const express = require("express");

const usersRouter = require("./Users/users-router");

const session = require("express-session");

const server = express();

server.use(express.json());

server.use(
  session({
    name: "lighthouse",
    secret: "best not spill yer beans!",
    cookie: {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      secure: true
    },
    httpOnly: true,
    resave: false,
    saveUninitialized: false
  })
);

server.get("/", (req, res) => {
  res.send("Auth API");
});

server.use("/api", usersRouter);

module.exports = server;
