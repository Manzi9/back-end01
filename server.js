const express = require("express");
const app = express();

const users = require("./users.json");

users.forEach((user) => {
  user.id = Math.round(Math.random() * 10000);
});

app.get("/", (request, response) => {
  response.send(users);
});

//====================================
//delete one
app.delete("/:id", (request, response) => {
  console.log("new delete request", request.params.id);
  const { id } = request.params;

  const indexOf = users.findIndex((user) => {
    return user.id === Number(id);
  });

  if (id < 0 || Number.isNaN(id)) {
    //this fails for NaN?!
    response.status(400).send("Incorrect ID");
    return;
  }

  if (id === NaN) {
    //also fails
    response.status(400).send("ID doesn't exist");
  }

  users.splice(indexOf, 1);

  response.send(users);
});

//====================================
//Write One

//====================================

const port = process.env.PORT || 6001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
