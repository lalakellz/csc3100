// backend.js
import express from "express";
import cors from "cors";
import userService from "./services/user-service.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  userService
    .getUsers(name, job)
    .then((result) => {
      result = { users_list: result };
      res.send(result);
    })
    .catch((error) => console.log(error)); //is there an error code i could use for this?
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  userService
    .findUserById(id)
    .then((result) => {
      if (result === null) {
        res.status(404).send("Resource not found.");
      } else {
        res.send(result);
      }
    })
    .catch(() => res.status(404).send("Resource not found."));
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  userService
    .addUser(userToAdd)
    .then((newUser) => res.status(201).send(newUser))
    .catch((error) => console.log(error));
});

app.delete("/users/:id", (req, res) => {
  const id = req.params["id"];
  userService
    .removeUser(id)
    .then((user) => {
      if (user === null) {
        res.status(404).send("resource not found");
      } else {
        res.status(204).send();
      }
    })
    .catch(() => res.status(404).send("resource not found"));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});