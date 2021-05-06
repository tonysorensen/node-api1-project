// BUILD YOUR SERVER HERE
const express = require("express");
const Users = require("./users/model");

const server = express();

server.use(express.json());

//GET /api/users - returns an array of users
server.get("/api/users", (req, res) => {
  console.log("GET from /api/users", res);
  Users.find()
    .then((users) => {
      console.log(users);
      res.json(users);
    })
    .catch(() => {
      res.status(500).json({
        message: "The users information could not be retrieved",
      });
    });
});

//GET /api/users/:id - returns the user with specified id
server.get("/api/users/:id", async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    if (!user) {
      res.status(404).json({
        message: "The user with the specified ID does not exist",
      });
    } else {
      res.json(user);
    }
  } catch (err) {
    res.status(500).json({
      message: "The user information could not be retrieved",
    });
  }
});

//POST /api/users - creates user with info sent inside request body
//
//PUT /api/users/:id - Updates the user with the specified id using data from request body and returns the modified user
//
//DELETE /api/users/:id - Removes hte user with the specified id and returns the deleted user

module.exports = server; // EXPORT YOUR SERVER instead of {}
