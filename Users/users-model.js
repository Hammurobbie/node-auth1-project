const db = require("../data/db-config");

module.exports = {
  findBy,
  find,
  register
};

function findBy(username) {
  return db("users").where({ username: username });
}

function find() {
  return db("users");
}

function register(userData) {
  return db("users")
    .insert(userData)
    .then(usr => {
      return findBy(usr[0]);
    });
}
