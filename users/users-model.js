const db = require("../database/dbConfig");

module.exports = {
  getUsers,
  getUserById,
  addUser,
  findBy,
  remove,
};
//helpers go here
function getUsers() {
  return db("users").select("id", "username").orderBy("id");
}

function getUserById(id) {
  return db("users").select("id", "username").where({ id });
}
function addUser(user) {
  db("users").insert(user);

  return db("users").select("id", "username").where({ id: 1 }).first();
}

function findBy(filter) {
  return db("users");
}

function remove(username) {
  return db("users").where({ username: username }).del();
}
