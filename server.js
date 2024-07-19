const express = require("express");
const app = express();
const users = require("./users.json");

app.use(express.json()); // Allows us to read body

setID = Math.round(Math.random() * 10000); //end up repeating this

users.forEach((user) => {
  user.id = Math.round(Math.random() * 10000);
});

//====================================
//Get all

app.get("/", (request, response) => {
  console.log("new get request");
  response.send(users);
});

//====================================
//Delete one

//This works initially, but after a few mins the object reappears?
app.delete("/:id", (request, response) => {
  console.log("new delete request", request.params.id);
  const { id } = request.params;

  const indexOf = users.findIndex((user) => {
    return user.id === Number(id);
  });

  if (id < 0 || Number.isNaN(id)) {
    //this fails for NaN?!
    response.status(400).send("Incorrect ID", { status: 0 });
    return;
  }

  if (id === NaN) {
    //also fails
    response.status(400).send("ID doesn't exist", { status: 0 });
  }

  users.splice(indexOf, 1);

  response.send(users);
});

//====================================
//Write One
// It doesn't check for duplicates or validate yet

app.post("/", (request, response) => {
  console.log("new post reuqest", request.body);
  users.push(request.body);
  users[users.length - 1].id = setID;
  response.send({ status: 1 });
});

//====================================
//Change One

app.put("/:id", (request, result));

const { id } = request.params;

const indexOf = users.findIndex((user) => {
  return user.id === Number(id);
});
users[indexOf] = request.body;

//====================================
const port = process.env.PORT || 6001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
