exports.seed = function(knex) {
  return knex("users").insert([
    { username: "winslow", password: "beans" },
    { username: "tom", password: "spill" }
  ]);
};
