const express = require("express");

const usersRouter = require("./Users/users-router");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send("Auth API");
});

server.use("/api", usersRouter);

module.exports = server;
