const knex = require("knex");

const configDev = require("../knexfile").development;

module.exports = knex(configDev);
