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
server.post("/api/users", async (req, res) => {
  try {
    const newUser = req.body;
    if (!newUser.name || !newUser.bio) {
      res.status(400).json({
        message: "Please provide name and bio for the user",
      });
    } else {
      const addUser = await Users.insert(newUser);
      res.status(201).json(addUser);
    }
  } catch (err) {
    res.status(500).json({
      message: "There was an error while saving the user to the database",
    });
  }
});
//PUT /api/users/:id - Updates the user with the specified id using data from request body and returns the modified user
server.put("/api/users/:id", async (req, res) => {
  try {
    if (!req.body.name || !req.body.bio) {
      res.status(400).json({
        message: "Please provide name and bio for the user",
      });
    } else {
      const updatedUser = await Users.update(req.params.id, req.body);
      if (!updatedUser) {
        res.status(404).json({
          message: "The user with the specified ID does not exist",
        });
      } else {
        res.json(updatedUser);
      }
    }
  } catch (err) {
    res.status(500).json({
      message: "The user information could not be modified",
    });
  }
});
//DELETE /api/users/:id - Removes hte user with the specified id and returns the deleted user
server.delete("/api/users/:id", (req, res) => {
  Users.remove(req.params.id)
    .then((deletedUser) => {
      if (!deletedUser) {
        res.status(404).json({
          message: "The user with the specified ID does not exist",
        });
      } else {
        res.json(deletedUser);
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "The user could not be removed",
        error: err,
      });
    });
});
module.exports = server; // EXPORT YOUR SERVER instead of {}
