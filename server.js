const express = require("express");

const cors = require("cors");

const usersRouter = require("./Users/users-router");

const session = require("express-session");

// const dbConnection = require("./data/db-config");

// const KnexSessionStore = require("connect-session-knex")(session);

const server = express();

server.use(express.json());

server.use(cors());

server.use(
  session({
    name: "lighthouse",
    secret: "best not spill yer beans!",
    cookie: {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      secure: false
    },
    httpOnly: false,
    resave: false,
    saveUninitialized: false
    // store: new KnexSessionStore({
    //   knex: dbConnection,
    //   tablename: "sessions",
    //   sidFieldName: "sid",
    //   createTable: true,
    //   clearInterval: 60000,
    // })
  })
);

server.get("/", (req, res) => {
  res.send("Auth API");
});

server.use("/api", usersRouter);

module.exports = server;
